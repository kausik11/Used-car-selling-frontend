import { useRef } from 'react';

const LOVE_STORIES = [
  {
    id: 'rasho',
    name: 'Manu Rasho',
    city: 'Bengaluru',
    quote: "Our car looks like a new car and drives like one. Our daughters' smiles made this worth it.",
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ayush',
    name: 'Ayush Srivastava',
    city: 'Lucknow',
    quote: "Our first family car that we'll truly love for years to come.",
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'madhulika',
    name: 'Madhulika Singh',
    city: 'Lucknow',
    quote: "Spinny helped us find a family car that's great for daily commutes and long trips.",
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pazhanian',
    name: 'Pazhanian',
    city: 'Chennai',
    quote: 'Being able to spoil my kid with a safe car from Spinny has been very special for me.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'raghav',
    name: 'Raghav B.',
    city: 'Delhi',
    quote: 'Transparent deal, quick delivery, and the car condition was exactly as promised.',
    image:
      'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?auto=format&fit=crop&w=1200&q=80',
  },
];

const SpinnyLoveStoriesSection = () => {
  const railRef = useRef(null);

  const scrollNext = () => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative space-y-8 rounded-3xl bg-[#141528] px-4 py-8 sm:px-6 md:px-8">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-white/20" />
          <h2 className="text-center text-4xl font-black text-[#fdfdff]">Over 2 Lakh Spinny Love Stories</h2>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {LOVE_STORIES.map((story) => (
            <article
              key={story.id}
              className="relative h-[500px] min-w-[340px] snap-start overflow-hidden rounded-2xl bg-black shadow-lg"
            >
              <img src={story.image} alt={`${story.name} love story`} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />

              <div className="absolute left-4 top-4 flex items-center gap-2 text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaad2b] text-sm font-black">
                  S
                </span>
                <span className="text-2xl font-black tracking-tight">myspinny</span>
              </div>

              <div className="absolute inset-x-4 bottom-4 text-white">
                <p className="text-3xl font-black">
                  {story.name} <span className="text-white/80">| {story.city}</span>
                </p>
                <p className="mt-2 text-lg leading-relaxed text-white/95">{story.quote}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#1e1f47] text-3xl font-bold text-[#fdfdff] shadow-lg transition hover:bg-[#2a2b5a] lg:inline-flex"
          aria-label="Next stories"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default SpinnyLoveStoriesSection;
