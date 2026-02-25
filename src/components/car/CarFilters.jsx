import { useMemo } from 'react';

const CarFilters = ({ cars, filters, onFilterChange }) => {
  const brands = useMemo(() => [...new Set(cars.map((car) => car.brand))].sort(), [cars]);

  return (
    <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">Filters</h3>

      <div className="space-y-2">
        <label htmlFor="brand" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Brand
        </label>
        <select
          id="brand"
          value={filters.brand}
          onChange={(event) => onFilterChange({ brand: event.target.value })}
          className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="fuelType" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Fuel Type
        </label>
        <select
          id="fuelType"
          value={filters.fuelType}
          onChange={(event) => onFilterChange({ fuelType: event.target.value })}
          className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-500"
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="transmission" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Transmission
        </label>
        <select
          id="transmission"
          value={filters.transmission}
          onChange={(event) => onFilterChange({ transmission: event.target.value })}
          className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-500"
        >
          <option value="">All Transmissions</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
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
