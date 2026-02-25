import { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCube, FaTimes } from 'react-icons/fa';
import PannellumViewer from './PannellumViewer';
import Product360Viewer from './Product360Viewer';

const PANORAMA_360_IMAGE = 'https://cdn.eso.org/images/screen/fanis360pan-cc.jpg';
const INTERIOR_360_IMAGE = '/grregewrgwe.jpg';

const CarGallery = ({ images = [], title = 'Car' }) => {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('exterior');
  const [useFallback360, setUseFallback360] = useState(false);
  const [useFallbackInterior360, setUseFallbackInterior360] = useState(false);
  const hasImages = safeImages.length > 0;
  const activeIndex = hasImages ? Math.min(selectedIndex, safeImages.length - 1) : 0;
  const selectedImage = safeImages[activeIndex];
  const galleryImages = safeImages.slice(0, 8);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalOpen]);

  const handlePrev = () => {
    if (!hasImages) return;
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!hasImages) return;
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="space-y-4">
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {hasImages ? (
          <img src={selectedImage} alt={title} className="h-[360px] w-full bg-slate-100 object-contain sm:h-[460px]" />
        ) : (
          <div className="flex h-[360px] items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500 sm:h-[460px]">
            No images available
          </div>
        )}

        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md bg-black/40 p-2 text-white transition hover:bg-black/60 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous image"
          disabled={!hasImages}
        >
          <FaChevronLeft />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-black/40 p-2 text-white transition hover:bg-black/60 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next image"
          disabled={!hasImages}
        >
          <FaChevronRight />
        </button>

        {hasImages ? (
          <button
            type="button"
            onClick={() => {
              setActiveTab('exterior');
              setIsModalOpen(true);
            }}
            className="group absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 px-4 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:from-violet-700 hover:via-indigo-600 hover:to-violet-700 hover:shadow-violet-500/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            aria-label="Open 360 view modal"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 inline-flex items-center gap-2">
              Click to view <FaCube className="text-[11px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="inline-flex items-center gap-1 text-base leading-none">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200" />
                </span>
                360
              </span>
            </span>
          </button>
        ) : null}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index + 1}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`relative h-24 min-w-[120px] overflow-hidden rounded-xl border-2 transition sm:min-w-[150px] ${
              activeIndex === index ? 'border-violet-700' : 'border-slate-200 hover:border-violet-300'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`${title}-${index + 1}`} className="h-full w-full object-cover" />

            {index === 0 ? (
              <span className="absolute right-1 top-1 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-slate-900">
                360
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">{title} 360 View</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close 360 modal"
              >
                <FaTimes />
              </button>
            </div>

            <div className="border-b border-slate-200 px-4">
              <div className="flex items-center gap-2 py-2">
                {['exterior', 'interior', 'gallery'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                      activeTab === tab ? 'bg-violet-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4">
              {activeTab === 'exterior' ? (
                useFallback360 ? (
                  <Product360Viewer panoramaImage={PANORAMA_360_IMAGE} frames={safeImages} alt={`${title} exterior 360`} />
                ) : (
                  <PannellumViewer
                    imageSrc={PANORAMA_360_IMAGE}
                    height={380}
                    title={`${title} Exterior 360`}
                    author="Car Panorama"
                    onError={() => setUseFallback360(true)}
                  />
                )
              ) : null}

              {activeTab === 'interior' ? (
                useFallbackInterior360 ? (
                  <Product360Viewer panoramaImage={INTERIOR_360_IMAGE} frames={safeImages} alt={`${title} interior 360`} />
                ) : (
                  <PannellumViewer
                    imageSrc={INTERIOR_360_IMAGE}
                    height={380}
                    title={`${title} Interior 360`}
                    author="Car Interior Panorama"
                    initialHfov={120}
                    minHfov={120}
                    maxHfov={120}
                    onError={() => setUseFallbackInterior360(true)}
                  />
                )
              ) : null}

              {activeTab === 'gallery' ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt={title}
                    className="h-[280px] w-full rounded-xl border border-slate-200 bg-slate-100 object-contain sm:h-[380px]"
                  />
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`${image}-gallery-${index + 1}`}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`overflow-hidden rounded-lg border-2 ${
                          selectedIndex === index ? 'border-violet-700' : 'border-slate-200 hover:border-violet-300'
                        }`}
                      >
                        <img src={image} alt={`${title} gallery ${index + 1}`} className="h-24 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default CarGallery;
