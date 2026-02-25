import { useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const YEAR_OPTIONS = [2024, 2022, 2020, 2018, 2016, 2014, 2012, 2010];
const KM_OPTIONS = [
  { value: 10000, label: '10,000 kms or less' },
  { value: 30000, label: '30,000 kms or less' },
  { value: 50000, label: '50,000 kms or less' },
  { value: 75000, label: '75,000 kms or less' },
  { value: 100000, label: '1,00,000 kms or less' },
  { value: 125000, label: '1,25,000 kms or less' },
];

const CarFilters = ({ cars, filters, onFilterChange }) => {
  const brands = useMemo(() => [...new Set(cars.map((car) => car.brand))].sort(), [cars]);
  const selectClasses =
    'h-12 w-full appearance-none rounded-lg border-2 border-slate-300 bg-white px-4 pr-10 text-base font-medium text-slate-800 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 hover:border-slate-400 [&>option]:bg-white [&>option]:text-slate-800';

  return (
    <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <h3 className="text-base font-bold text-slate-900">Filters</h3>

      <div className="space-y-2">
        <label htmlFor="brand" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Brand
        </label>
        <div className="relative">
          <select
            id="brand"
            value={filters.brand}
            onChange={(event) => onFilterChange({ brand: event.target.value })}
            className={selectClasses}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-600" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="fuelType" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Fuel Type
        </label>
        <div className="relative">
          <select
            id="fuelType"
            value={filters.fuelType}
            onChange={(event) => onFilterChange({ fuelType: event.target.value })}
            className={selectClasses}
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
          <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-600" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="transmission" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Transmission
        </label>
        <div className="relative">
          <select
            id="transmission"
            value={filters.transmission}
            onChange={(event) => onFilterChange({ transmission: event.target.value })}
            className={selectClasses}
          >
            <option value="">All Transmissions</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-600" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Year</p>
        <div className="space-y-2">
          {YEAR_OPTIONS.map((year) => (
            <label key={year} className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-800">
              <input
                type="radio"
                name="year-filter"
                value={year}
                checked={filters.minYear === year}
                onChange={() => onFilterChange({ minYear: year })}
                className="h-5 w-5 accent-brand-700"
              />
              <span>{year} &amp; above</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kms Driven</p>
        <div className="space-y-2">
          {KM_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-800"
            >
              <input
                type="radio"
                name="km-filter"
                value={option.value}
                checked={filters.maxKm === option.value}
                onChange={() => onFilterChange({ maxKm: option.value })}
                className="h-5 w-5 accent-brand-700"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Max Price</label>
        <input
          type="range"
          min="300000"
          max="2500000"
          step="50000"
          value={filters.maxPrice}
          onChange={(event) => onFilterChange({ maxPrice: Number(event.target.value) })}
          className="w-full accent-brand-700"
        />
        <p className="text-sm font-semibold text-slate-700">Up to Rs {filters.maxPrice.toLocaleString('en-IN')}</p>
      </div>

      <button
        type="button"
        onClick={() =>
          onFilterChange({
            brand: '',
            fuelType: '',
            transmission: '',
            minYear: 0,
            maxKm: 0,
            minPrice: 0,
            maxPrice: 5000000,
            sortBy: 'newest',
          })
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-700"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default CarFilters;
