import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaChevronRight, FaBolt, FaFileAlt } from 'react-icons/fa';

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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#190f31] via-[#151a45] to-[#10363f] p-4 pt-12 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-6 sm:pt-14 md:p-8 md:pt-16">
        <div className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-6 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-0 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-1.5 shadow-lg">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`rounded-xl px-4 py-2.5 text-lg font-bold transition ${
                activeTab === 'buy' ? 'bg-[#eaad2b] text-[#0f102e]' : 'text-[#eaad2b] hover:bg-[#eaad2b]/10'
              }`}
            >
              Buy car
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`rounded-xl px-4 py-2.5 text-lg font-bold transition ${
                activeTab === 'sell' ? 'bg-[#eaad2b] text-[#0f102e]' : 'text-[#eaad2b] hover:bg-[#eaad2b]/10'
              }`}
            >
              Sell car
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0d0e24] p-4 sm:p-6 md:p-10">
          {activeTab === 'buy' ? (
            <div>
              <h2 className="text-center text-4xl font-black text-[#fdfdff]">Sinhg's benefits</h2>

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
                    <h3 className="mt-4 text-3xl font-black text-[#fdfdff]">{benefit.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-[#fdfdff]/80">{benefit.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-lg font-bold text-[#fdfdff]/80 transition hover:text-[#fdfdff]"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#eaad2b] text-sm text-[#0f102e]">
                    <FaPlay className="h-2.5 w-2.5" />
                  </span>
                  Watch the film
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="w-full rounded-2xl bg-[#eaad2b] px-10 py-3 text-xl font-black text-[#0f102e] transition hover:bg-[#eaad2b]/85 md:w-auto"
                >
                  Browse cars
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="inline-flex items-center gap-1 text-lg font-bold text-[#fdfdff]/80 transition hover:text-[#fdfdff]"
                >
                  Learn more <FaChevronRight className="h-3 w-3" />
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
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eaad2b] text-[#0f102e]"><FaPlay className="h-4 w-4" /></span>
                  <p className="max-w-[220px] text-center text-4xl font-black leading-tight">Sell your car for the best price</p>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-4xl font-black text-[#fdfdff]">Select your car brand to get started</h3>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-lg text-[#fdfdff]/75">
                  <span className="inline-flex items-center gap-1.5"><FaBolt className="text-[#eaad2b]" /> Instant online quote</span>
                  <span className="inline-flex items-center gap-1.5"><FaFileAlt className="text-[#eaad2b]" /> Free car evaluation</span>
                  <span>₹ Same day payment</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {brandOptions.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      className="rounded-2xl bg-white px-4 py-4 text-sm font-bold text-[#eaad2b] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-[#eaad2b] px-10 py-3 text-xl font-black text-[#0f102e] transition hover:bg-[#eaad2b]/85 sm:w-auto"
                  >
                    Get price
                  </button>
                  <span className="text-4xl font-black text-[#fdfdff]">
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
