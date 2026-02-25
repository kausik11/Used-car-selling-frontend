import { useNavigate } from 'react-router-dom';

const POPULAR_BRANDS = [
  { id: 'maruti', name: 'Maruti Suzuki', count: '70+ cars', badge: 'MS' },
  { id: 'hyundai', name: 'Hyundai', count: '60+ cars', badge: 'H' },
  { id: 'honda', name: 'Honda', count: '30+ cars', badge: 'HN' },
  { id: 'tata', name: 'Tata', count: '20+ cars', badge: 'T' },
  { id: 'renault', name: 'Renault', count: '10+ cars', badge: 'R' },
  { id: 'mahindra', name: 'Mahindra', count: '10 cars', badge: 'M' },
  { id: 'toyota', name: 'Toyota', count: '9 cars', badge: 'TY' },
  { id: 'volkswagen', name: 'Volkswagen', count: '9 cars', badge: 'VW' },
  { id: 'ford', name: 'Ford', count: '7 cars', badge: 'F' },
  { id: 'kia', name: 'Kia', count: '6 cars', badge: 'K' },
  { id: 'datsun', name: 'Datsun', count: '5 cars', badge: 'D' },
  { id: 'demo-max', name: 'demo MAX', count: '', badge: 'MAX', isBrand: false },
];

const ExplorePopularBrandsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 rounded-3xl bg-[#141528] px-4 py-8 sm:px-6 md:px-8">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-white/20" />
          <h2 className="text-center text-4xl font-black text-[#fdfdff]">Explore Popular Brands</h2>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {POPULAR_BRANDS.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => {
                if (brand.isBrand === false) {
                  navigate('/search');
                  return;
                }
                navigate(`/search?q=${encodeURIComponent(brand.name)}`);
              }}
              className="group rounded-3xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-black tracking-wide text-[#eaad2b] transition group-hover:border-[#7d2ec8] group-hover:bg-[#f3e9ff]">
                {brand.badge}
              </div>
              <p className="mt-3 text-lg font-bold text-[#eaad2b]">{brand.name}</p>
              {brand.count ? <p className="mt-0.5 text-lg font-black text-[#eaad2b]">{brand.count}</p> : null}
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="rounded-2xl bg-[#eaad2b] px-14 py-3 text-lg font-bold text-[#0f102e] transition hover:bg-[#eaad2b]/80"
          >
            View all cars
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExplorePopularBrandsSection;
