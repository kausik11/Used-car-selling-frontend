import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const buyBenefits = [
  {
    id: 'inspection',
    title: '200-Points Inspection',
    description: 'Every car is carefully handpicked after a thorough quality inspection.',
    icon: '✓',
    image:
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'warranty',
    title: 'Warranty included',
    description: 'Our way of being there for you through your car ownership journey.',
    icon: '🛡',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'money-back',
    title: '5-Day Money Back',
    description: 'All our cars come with a no-questions-asked 5-day money back guarantee.',
    icon: '₹',
    image:
      'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fixed-price',
    title: 'Fixed Price Assurance',
    description: 'No more endless negotiations or haggling. You get the best deal upfront.',
    icon: '🏷',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  },
];

const brandOptions = [
  'Maruti Suzuki',
  'Hyundai',
  'Tata',
  'Honda',
  'Renault',
  'Ford',
  'Volkswagen',
  'Mahindra',
  'Kia',
  'BMW',
  'Mercedes-Benz',
  'More',
];

const ExploreByIntentSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-[#e9e2ef] p-4 pt-12 sm:p-6 sm:pt-14 md:p-8 md:pt-16">
        <div className="absolute left-1/2 top-0 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-1.5 shadow-lg">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`rounded-xl px-4 py-2.5 text-lg font-bold transition ${
                activeTab === 'buy' ? 'bg-[#6b0cab] text-white' : 'text-[#5f228d] hover:bg-[#f3ebfb]'
              }`}
            >
              Buy car
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`rounded-xl px-4 py-2.5 text-lg font-bold transition ${
                activeTab === 'sell' ? 'bg-[#6b0cab] text-white' : 'text-[#5f228d] hover:bg-[#f3ebfb]'
              }`}
            >
              Sell car
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f5f5f8] p-4 sm:p-6 md:p-10">
          {activeTab === 'buy' ? (
            <div>
              <h2 className="text-center text-4xl font-black text-[#1e0a5e]">Spinny benefits</h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {buyBenefits.map((benefit) => (
                  <article key={benefit.id} className="text-center">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img src={benefit.image} alt={benefit.title} className="h-48 w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/30 text-xl font-black text-white backdrop-blur-sm">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="mt-4 text-3xl font-black text-[#220a67]">{benefit.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-[#2e0f7d]">{benefit.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-lg font-bold text-[#6c15b8] transition hover:text-[#4d0e85]"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6c15b8] text-sm text-white">
                    ▶
                  </span>
                  Watch the film
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="w-full rounded-2xl bg-rose-500 px-10 py-3 text-xl font-black text-white transition hover:bg-rose-400 md:w-auto"
                >
                  Browse cars
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="text-lg font-bold text-[#6c15b8] transition hover:text-[#4d0e85]"
                >
                  Learn more ›
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1200&q=80"
                  alt="Sell your car"
                  className="h-[460px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6b0cab]">▶</span>
                  <p className="max-w-[220px] text-center text-4xl font-black leading-tight">Sell your car for the best price</p>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-4xl font-black text-[#1e0a5e]">Select your car brand to get started</h3>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-lg text-[#5f228d]">
                  <span>⚡ Instant online quote</span>
                  <span>🧾 Free car evaluation</span>
                  <span>₹ Same day payment</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {brandOptions.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      className="rounded-2xl bg-white px-4 py-4 text-sm font-bold text-[#5f228d] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-rose-500 px-10 py-3 text-xl font-black text-white transition hover:bg-rose-400 sm:w-auto"
                  >
                    Get price
                  </button>
                  <span className="text-4xl font-black text-[#5f228d]">
                    Sell<span className="text-emerald-500">Right</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreByIntentSection;
