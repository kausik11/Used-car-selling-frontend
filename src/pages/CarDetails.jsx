import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarGallery from '../components/car/CarGallery';
import Loader from '../components/common/Loader';
import { useCars } from '../context/CarContext';

const CarDetails = () => {
  const { id } = useParams();
  const { selectedCar, fetchCarById, loading, error } = useCars();
  const [downPayment, setDownPayment] = useState(150000);
  const [loanYears, setLoanYears] = useState(5);

  useEffect(() => {
    fetchCarById(id);
  }, [fetchCarById, id]);

  const emi = useMemo(() => {
    if (!selectedCar) return 0;

    const principal = Math.max(selectedCar.price - downPayment, 0);
    const rate = 0.09 / 12;
    const months = loanYears * 12;

    if (!principal || !months) return 0;

    return Math.round((principal * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1));
  }, [selectedCar, downPayment, loanYears]);

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
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {error ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">{error}</div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <CarGallery images={selectedCar.images} title={selectedCar.title} />

        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">{selectedCar.title}</h1>
            <p className="mt-2 text-sm text-slate-600">
              {selectedCar.year} • {selectedCar.kmDriven.toLocaleString('en-IN')} km • {selectedCar.location}
            </p>
            <p className="mt-4 text-3xl font-black text-slate-900">Rs {selectedCar.price.toLocaleString('en-IN')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">Fuel:</span> {selectedCar.fuelType}
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">Transmission:</span> {selectedCar.transmission}
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">Engine:</span> {selectedCar.specifications.engine}
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">Seats:</span> {selectedCar.specifications.seats}
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">Power:</span> {selectedCar.specifications.power}
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">Mileage:</span> {selectedCar.specifications.mileage}
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            Book Test Drive
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">EMI Calculator</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="downPayment" className="mb-2 block text-sm font-semibold text-slate-700">
              Down Payment
            </label>
            <input
              id="downPayment"
              type="range"
              min="50000"
              max={selectedCar.price}
              step="10000"
              value={downPayment}
              onChange={(event) => setDownPayment(Number(event.target.value))}
              className="w-full accent-brand-700"
            />
            <p className="mt-2 text-sm text-slate-600">Rs {downPayment.toLocaleString('en-IN')}</p>
          </div>

          <div>
            <label htmlFor="loanYears" className="mb-2 block text-sm font-semibold text-slate-700">
              Loan Tenure (Years)
            </label>
            <select
              id="loanYears"
              value={loanYears}
              onChange={(event) => setLoanYears(Number(event.target.value))}
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-500"
            >
              <option value={3}>3 Years</option>
              <option value={4}>4 Years</option>
              <option value={5}>5 Years</option>
              <option value={6}>6 Years</option>
              <option value={7}>7 Years</option>
            </select>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-brand-50 p-5">
          <p className="text-sm font-semibold text-brand-700">Estimated Monthly EMI</p>
          <p className="mt-2 text-3xl font-black text-brand-700">Rs {emi.toLocaleString('en-IN')}</p>
          <p className="mt-1 text-xs text-brand-700/80">Calculated at an indicative 9% annual interest rate.</p>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
