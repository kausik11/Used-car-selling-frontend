import { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from '../components/common/Loader';
import CarDetailsBreadcrumb from '../components/car/details/CarDetailsBreadcrumb';
import CarDetailsEmiSection from '../components/car/details/CarDetailsEmiSection';
import CarDetailsExploreSection from '../components/car/details/CarDetailsExploreSection';
import CarDetailsFaqSection from '../components/car/details/CarDetailsFaqSection';
import CarDetailsHero from '../components/car/details/CarDetailsHero';
import CarDetailsInfoSections from '../components/car/details/CarDetailsInfoSections';
import CarDetailsSimilarSection from '../components/car/details/CarDetailsSimilarSection';
import {
  BENEFITS,
  DUMMY_CAR_IMAGES,
  EXPLORE_MORE_ITEMS,
  FAQ_ITEMS,
  REASONS_TO_BUY,
} from '../components/car/details/constants';
import { formatNumber } from '../components/car/details/utils';
import { useCars } from '../context/CarContext';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const { cars, selectedCar, fetchCarById, loading, error } = useCars();
  const [downPayment, setDownPayment] = useState(150000);
  const [loanYears, setLoanYears] = useState(5);

  useEffect(() => {
    fetchCarById(id);
  }, [fetchCarById, id]);

  const carPrice = useMemo(() => {
    const price = Number(selectedCar?.price);
    return Number.isFinite(price) ? price : 0;
  }, [selectedCar?.price]);

  const safeDownPayment = useMemo(() => Math.min(Math.max(downPayment, 0), carPrice), [carPrice, downPayment]);
  const specs = selectedCar?.specifications ?? {};
  const sourceImages = Array.isArray(selectedCar?.images) ? selectedCar.images.filter(Boolean) : [];
  const images = sourceImages.length ? sourceImages : DUMMY_CAR_IMAGES;
  const months = loanYears * 12;

  const emi = useMemo(() => {
    if (!selectedCar || !carPrice) return 0;

    const principal = Math.max(carPrice - safeDownPayment, 0);
    const rate = 0.09 / 12;

    if (!principal || !months) return 0;

    return Math.round((principal * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1));
  }, [carPrice, months, safeDownPayment, selectedCar]);

  const loanAmount = Math.max(carPrice - safeDownPayment, 0);
  const totalPayable = emi * months;

  const selectedCarId = selectedCar?.id;
  const similarCars = useMemo(
    () => cars.filter((car) => String(car.id) !== String(selectedCarId)).slice(0, 4),
    [cars, selectedCarId],
  );

  const topFeatures = useMemo(
    () =>
      [specs.engine && `Engine ${specs.engine}`, specs.power && `${specs.power} power`, specs.mileage && `${specs.mileage} mileage`]
        .filter(Boolean)
        .concat(['Reverse camera', 'Touchscreen infotainment', 'Alloy wheels']),
    [specs.engine, specs.mileage, specs.power],
  );

  const handleDownPaymentChange = useCallback(
    (event) => {
      const nextValue = Number(event.target.value);
      setDownPayment(Math.min(Math.max(nextValue, 0), carPrice));
    },
    [carPrice],
  );

  const handleLoanYearsChange = useCallback((event) => {
    setLoanYears(Number(event.target.value));
  }, []);

  if (loading && !selectedCar) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Loader text="Loading car details..." />
      </section>
    );
  }

  if (!selectedCar) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error || 'Car details unavailable.'}</div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <CarDetailsBreadcrumb car={selectedCar} />

      {error ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">{error}</div>
      ) : null}

      <CarDetailsHero
        car={selectedCar}
        carPrice={carPrice}
        emi={emi}
        formatNumber={formatNumber}
        images={images}
        reasonsToBuy={REASONS_TO_BUY}
        specs={specs}
      />

      <CarDetailsInfoSections benefits={BENEFITS} car={selectedCar} specs={specs} topFeatures={topFeatures} />

      {/* <CarDetailsEmiSection
        carPrice={carPrice}
        emi={emi}
        formatNumber={formatNumber}
        loanAmount={loanAmount}
        loanYears={loanYears}
        onDownPaymentChange={handleDownPaymentChange}
        onLoanYearsChange={handleLoanYearsChange}
        safeDownPayment={safeDownPayment}
        totalPayable={totalPayable}
      /> */}

      <CarDetailsSimilarSection cars={similarCars} />
      <CarDetailsExploreSection items={EXPLORE_MORE_ITEMS} />
      <CarDetailsFaqSection items={FAQ_ITEMS} />
    </section>
  );
};

export default CarDetails;
