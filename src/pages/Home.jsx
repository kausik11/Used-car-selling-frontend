import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CarList from '../components/car/CarList';
import HeroCarousel from '../components/common/HeroCarousel';
import SearchInput from '../components/common/SearchInput';
import Loader from '../components/common/Loader';
import ExploreByBodyTypeSection from '../components/home/ExploreByBodyTypeSection';
import ExploreByIntentSection from '../components/home/ExploreByIntentSection';
import ExplorePopularBrandsSection from '../components/home/ExplorePopularBrandsSection';
import FaqSection from '../components/home/FaqSection';
import DemoLoveStoriesSection from '../components/home/DemoLoveStoriesSection';
import WhyChooseSinghGroup from '../components/home/WhyChooseSinghGroup';
import { useCars } from '../context/CarContext';

const Home = () => {
  const navigate = useNavigate();
  const { cars, loading, error, searchCars } = useCars();

  const featuredCars = useMemo(() => cars.filter((car) => car.featured).slice(0, 6), [cars]);

  const handleHeroSearch = useCallback((query) => {
    searchCars(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }, [navigate, searchCars]);

  return (
    <div className="space-y-12 pb-10">
      <div className='absoulate'>
      <HeroCarousel />

      <section className="relative z-20 mx-auto mt-10 w-full max-w-7xl px-4 sm:-mt-42 sm:px-6 md:-mt-40 lg:-mt-12 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-white to-slate-100 p-4 shadow-[0_16px_46px_rgba(0,0,0,0.3)] md:p-5">
          <div className="pointer-events-none absolute -left-14 top-0 h-28 w-28 rounded-full bg-cyan-300/35 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-28 w-28 rounded-full bg-violet-300/30 blur-2xl" />
          <div className="mx-auto max-w-3xl">
            <SearchInput onSearch={handleHeroSearch} placeholder="Search by model, brand, fuel type, city..." delay={500} />
          </div>
        </div>
      </section>
      </div>

      <ExploreByIntentSection />

       <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1030] via-[#0f1c3b] to-[#12363a] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-14 bottom-4 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#fdfdff]">Featured Cars</h2>
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="text-sm font-semibold text-[#fdfdff]/70 hover:text-[#fdfdff]"
            >
              View all cars
            </button>
          </div>

          {loading ? <Loader text="Loading featured inventory..." /> : null}

          {error ? (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
              {error}
            </div>
          ) : null}

          {!loading ? <CarList cars={featuredCars} /> : null}
        </div>
      </section>
      
      <ExploreByBodyTypeSection cars={cars} />
      <ExplorePopularBrandsSection />
      <DemoLoveStoriesSection />
      <WhyChooseSinghGroup />

     

      <FaqSection />
    </div>
  );
};

export default Home;
