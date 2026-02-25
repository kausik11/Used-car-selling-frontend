import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SLIDES = [
  {
    id: 1,
    title: 'the master',
    subtitle: "India's most-trusted car home",
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    title: 'drive your dream',
    subtitle: '200-point checked, quality-assured used cars',
    image:
      'https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    title: 'spin and save',
    subtitle: 'Transparent pricing with doorstep test drives',
    image:
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1920&q=80',
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = useMemo(() => SLIDES.length, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section
      className="relative h-[420px] w-full overflow-hidden md:h-[520px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, index) => (
        <article
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

          <div className="absolute left-6 top-8 z-10 max-w-xl space-y-3 text-white sm:left-10 sm:top-12 md:left-16 md:top-16">
            <h1 className="max-w-md text-4xl font-black uppercase leading-[0.95] text-amber-300 sm:text-5xl md:text-7xl">
              {slide.title}
            </h1>
            <p className="text-base font-bold text-amber-200 sm:text-2xl">{slide.subtitle}</p>

            <button
              type="button"
              onClick={() => navigate('/search')}
              className="mt-4 rounded-xl bg-[#eaad2b] px-8 py-3 text-sm font-bold text-[#0f102e] transition hover:bg-[#eaad2b]/85 sm:text-lg"
            >
              View all cars
            </button>
          </div>
        </article>
      ))}

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-2xl text-white backdrop-blur-sm transition hover:bg-black/45 sm:left-5"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-2xl text-white backdrop-blur-sm transition hover:bg-black/45 sm:right-5"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/65 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
