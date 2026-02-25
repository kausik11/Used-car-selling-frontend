import { useEffect, useState } from 'react';

const CarGallery = ({ images = [], title = 'Car' }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src={selectedImage} alt={title} className="h-[360px] w-full object-cover sm:h-[420px]" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index + 1}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border transition ${
              selectedImage === image ? 'border-brand-600' : 'border-slate-200 hover:border-brand-300'
            }`}
          >
            <img src={image} alt={`${title}-${index + 1}`} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default CarGallery;
