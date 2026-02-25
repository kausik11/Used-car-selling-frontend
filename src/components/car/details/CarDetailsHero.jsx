import { useState } from 'react';
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegHeart,
  FaShareAlt,
} from 'react-icons/fa';
import CarGallery from '../CarGallery';
import { isCarSaved, saveOrToggleCar } from '../../../utils/savedCars';

const CarDetailsHero = ({ car, carPrice, emi, images, reasonsToBuy, specs, formatNumber }) => {
  const [, setRefreshTick] = useState(0);
  const saved = isCarSaved(car.id);

  const handleSaveToggle = () => {
    saveOrToggleCar(car);
    setRefreshTick((value) => value + 1);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
      <div className="space-y-5">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <CarGallery images={images} title={car.title} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Reasons to buy</h2>
          <div className="mt-4 space-y-2">
            {reasonsToBuy.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:h-fit">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{car.title}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <FaMapMarkerAlt className="text-rose-500" />
            {car.location || 'N/A'} • {car.year || 'N/A'} • {formatNumber(car.kmDriven)} km
          </p>
          <p className="mt-4 text-3xl font-black text-slate-900">Rs {formatNumber(carPrice)}</p>
          <p className="mt-1 text-sm font-semibold text-violet-700">EMI starts at Rs {formatNumber(emi)} / month</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Fuel</p>
            <p className="font-semibold text-slate-900">{car.fuelType || 'N/A'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Transmission</p>
            <p className="font-semibold text-slate-900">{car.transmission || 'N/A'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Owner</p>
            <p className="font-semibold text-slate-900">1st Owner</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Color</p>
            <p className="font-semibold text-slate-900">{specs.color || 'N/A'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="w-full rounded-xl bg-violet-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-800">
            Book Test Drive
          </button>
          <button type="button" className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-700">
            Reserve Now
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm text-slate-600">
          <button type="button" className="inline-flex items-center gap-2 font-semibold hover:text-slate-900">
            <FaPhoneAlt className="text-violet-700" /> Call
          </button>
          <button type="button" className="inline-flex items-center gap-2 font-semibold hover:text-slate-900">
            <FaCalendarCheck className="text-violet-700" /> Schedule
          </button>
          <button type="button" className="inline-flex items-center gap-2 font-semibold hover:text-slate-900">
            <FaShareAlt className="text-violet-700" /> Share
          </button>
          <button
            type="button"
            onClick={handleSaveToggle}
            className={`inline-flex items-center gap-2 font-semibold transition ${
              saved ? 'text-rose-600 hover:text-rose-700' : 'hover:text-slate-900'
            }`}
          >
            {saved ? <FaHeart className="text-rose-500" /> : <FaRegHeart className="text-violet-700" />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CarDetailsHero;
