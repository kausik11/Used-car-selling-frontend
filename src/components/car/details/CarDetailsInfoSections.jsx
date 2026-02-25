import { FaCheckCircle, FaShieldAlt, FaStar } from 'react-icons/fa';

const CarDetailsInfoSections = ({ benefits, car, specs, topFeatures }) => (
  <>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-900">Car Overview</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Make Year</p>
          <p className="text-sm font-semibold text-slate-900">{car.year || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Ownership</p>
          <p className="text-sm font-semibold text-slate-900">1st Owner</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Engine</p>
          <p className="text-sm font-semibold text-slate-900">{specs.engine || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Seats</p>
          <p className="text-sm font-semibold text-slate-900">{specs.seats || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Power</p>
          <p className="text-sm font-semibold text-slate-900">{specs.power || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Mileage</p>
          <p className="text-sm font-semibold text-slate-900">{specs.mileage || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Fuel</p>
          <p className="text-sm font-semibold text-slate-900">{car.fuelType || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Transmission</p>
          <p className="text-sm font-semibold text-slate-900">{car.transmission || 'N/A'}</p>
        </div>
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-900">Quality Report</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <div className="flex items-center gap-2 font-semibold">
            <FaShieldAlt /> Certified Condition
          </div>
          <p className="mt-1 text-xs text-emerald-700">Body, electricals, and mechanicals verified.</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
          <div className="flex items-center gap-2 font-semibold">
            <FaCheckCircle /> Service Records
          </div>
          <p className="mt-1 text-xs text-sky-700">Routine service history checked for consistency.</p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm text-violet-800">
          <div className="flex items-center gap-2 font-semibold">
            <FaStar /> Road Test Passed
          </div>
          <p className="mt-1 text-xs text-violet-700">Suspension, steering, and brakes tested.</p>
        </div>
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-900">Benefits &amp; Add-ons</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {benefits.map((benefit) => (
          <div key={benefit} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700">
            {benefit}
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-900">Car Specifications</h2>
        <button type="button" className="text-sm font-semibold text-violet-700 hover:text-violet-800">
          View all specifications
        </button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs text-slate-500">Mileage (ARAI)</p>
          <p className="font-semibold text-slate-900">{specs.mileage || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs text-slate-500">Engine Capacity</p>
          <p className="font-semibold text-slate-900">{specs.engine || 'N/A'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs text-slate-500">Power</p>
          <p className="font-semibold text-slate-900">{specs.power || 'N/A'}</p>
        </div>
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-900">Top Features of this car</h2>
        <button type="button" className="text-sm font-semibold text-violet-700 hover:text-violet-800">
          View all features
        </button>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {topFeatures.map((feature) => (
          <div key={feature} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-sm text-slate-700">
            <FaCheckCircle className="text-emerald-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default CarDetailsInfoSections;

