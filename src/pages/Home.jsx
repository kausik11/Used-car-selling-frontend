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
import SpinnyLoveStoriesSection from '../components/home/SpinnyLoveStoriesSection';
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
        <div className="rounded-2xl bg-white p-4 shadow-xl md:p-5">
          <div className="mx-auto max-w-3xl">
            <SearchInput onSearch={handleHeroSearch} placeholder="Search by model, brand, fuel type, city..." delay={500} />
          </div>
        </div>
      </section>
      </div>

      <ExploreByIntentSection />

       <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </section>
      
      <ExploreByBodyTypeSection cars={cars} />
      <ExplorePopularBrandsSection />
      <SpinnyLoveStoriesSection />
      <WhyChooseSinghGroup />

     

      <FaqSection />
    </div>
  );
};

export default Home;
