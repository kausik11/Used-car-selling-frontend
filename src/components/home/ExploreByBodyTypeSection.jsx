import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

const BODY_TYPES = ['Hatchback', 'Sedan', 'SUV', 'MUV'];

const bodyTypeKeywords = {
  Hatchback: ['baleno', 'i10', 'i20', 'swift', 'kwid', 'alto', 'polo'],
  Sedan: ['city', 'virtus', 'verna', 'ciaz', 'amaze', 'slavia'],
  SUV: ['creta', 'seltos', 'nexon', 'xuv', 'kushaq', 'harrier', 'brezza'],
  MUV: ['innova', 'ertiga', 'carens', 'xl6', 'marazzo'],
};

const formatLakhPrice = (price) => `${(price / 100000).toFixed(2)} Lakh`;

const inferBodyType = (car) => {
  if (car.bodyType && BODY_TYPES.includes(car.bodyType)) {
    return car.bodyType;
  }

  const source = `${car.title} ${car.model}`.toLowerCase();
  if (bodyTypeKeywords.Hatchback.some((keyword) => source.includes(keyword))) return 'Hatchback';
  if (bodyTypeKeywords.Sedan.some((keyword) => source.includes(keyword))) return 'Sedan';
  if (bodyTypeKeywords.SUV.some((keyword) => source.includes(keyword))) return 'SUV';
  if (bodyTypeKeywords.MUV.some((keyword) => source.includes(keyword))) return 'MUV';
  return 'SUV';
};

const BodyTypeIcon = ({ active }) => (
  <FaCar className={`h-6 w-6 ${active ? 'text-[#0f102e]' : 'text-[#fdfdff]/70'}`} />
);

const ExploreByBodyTypeSection = ({ cars = [] }) => {
  const navigate = useNavigate();
  const [activeBodyType, setActiveBodyType] = useState('Hatchback');

  const mappedCars = useMemo(
    () =>
      cars.map((car) => ({
        ...car,
        resolvedBodyType: inferBodyType(car),
      })),
    [cars],
  );

  const filteredCars = useMemo(
    () => mappedCars.filter((car) => car.resolvedBodyType === activeBodyType),
    [mappedCars, activeBodyType],
  );

  const displayCars = useMemo(() => {
    if (filteredCars.length >= 4) return filteredCars.slice(0, 4);

    const filler = mappedCars.filter((car) => car.resolvedBodyType !== activeBodyType).slice(0, 4 - filteredCars.length);
    return [...filteredCars, ...filler];
  }, [filteredCars, mappedCars, activeBodyType]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative space-y-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#20132f] via-[#121d3b] to-[#0f3841] px-4 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:px-6 md:px-8">
        <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-white/20" />
          <h2 className="text-center text-4xl font-black text-[#fdfdff]">Explore by Body Type</h2>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-3 rounded-2xl bg-[#1e1f47] p-3">
          {BODY_TYPES.map((bodyType) => {
            const active = bodyType === activeBodyType;
            return (
              <button
                key={bodyType}
                type="button"
                onClick={() => setActiveBodyType(bodyType)}
                className={`flex min-w-[118px] flex-col items-center gap-1 rounded-xl px-4 py-2.5 transition ${
                  active ? 'bg-[#eaad2b] text-[#0f102e] shadow-md' : 'text-[#fdfdff]/70 hover:bg-[#eaad2b]/10'
                }`}
              >
                <BodyTypeIcon active={active} />
                <span className="text-sm font-bold">{bodyType}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayCars.map((car) => (
            <article key={car.id} className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-sm">
              <div className="h-44 overflow-hidden">
                <img src={car.images?.[0]} alt={car.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="space-y-1 px-4 py-3">
                <p className="line-clamp-1 text-base font-bold text-[#eaad2b]">{car.brand} {car.model}</p>
                <p className="text-2xl font-black text-[#eaad2b]">
                  ₹{formatLakhPrice(car.price)} <span className="text-sm font-semibold text-[#eaad2b]/50">onwards</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center pt-3">
          <button
            type="button"
            onClick={() => navigate(`/search?q=${encodeURIComponent(activeBodyType)}`)}
            className="rounded-2xl border-2 border-[#eaad2b] px-12 py-3 text-lg font-bold text-[#fdfdff] transition hover:bg-[#eaad2b] hover:text-[#0f102e]"
          >
            View all {activeBodyType.toLowerCase()}s
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreByBodyTypeSection;
