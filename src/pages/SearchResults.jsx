import { useCallback, useEffect, useMemo } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import CarFilters from '../components/car/CarFilters';
import CarList from '../components/car/CarList';
import Loader from '../components/common/Loader';
import Pagination from '../components/common/Pagination';
import SearchInput from '../components/common/SearchInput';
import { useCars } from '../context/CarContext';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'priceLowToHigh', label: 'Price: Low to High' },
  { value: 'priceHighToLow', label: 'Price: High to Low' },
  { value: 'kmLowToHigh', label: 'KM Driven: Low to High' },
  { value: 'yearNewest', label: 'Year: Newest' },
  { value: 'yearOldest', label: 'Year: Oldest' },
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const { cars, filteredCars, loading, error, filters, pagination, applyFilters, searchCars, setPage } = useCars();

  useEffect(() => {
    if (queryFromUrl !== filters.query) {
      searchCars(queryFromUrl);
    }
  }, [queryFromUrl, filters.query, searchCars]);

  const visibleCount = useMemo(() => filteredCars.length, [filteredCars.length]);
  const appliedFilters = useMemo(() => {
    const active = [];

    if (filters.query.trim()) active.push({ key: 'query', label: `Search: "${filters.query.trim()}"` });
    if (filters.brand) active.push({ key: 'brand', label: `Brand: ${filters.brand}` });
    if (filters.fuelType) active.push({ key: 'fuelType', label: `Fuel: ${filters.fuelType}` });
    if (filters.transmission) active.push({ key: 'transmission', label: `Transmission: ${filters.transmission}` });
    if (filters.minYear) active.push({ key: 'minYear', label: `Year: ${filters.minYear}+` });
    if (filters.maxKm) active.push({ key: 'maxKm', label: `KM: up to ${filters.maxKm.toLocaleString('en-IN')}` });
    if (filters.maxPrice < 5000000) {
      active.push({ key: 'maxPrice', label: `Price: up to Rs ${filters.maxPrice.toLocaleString('en-IN')}` });
    }

    return active;
  }, [filters]);

  const handleSearch = useCallback((query) => {
    searchCars(query);

    const nextParams = new URLSearchParams(searchParams);
    if (query) {
      nextParams.set('q', query);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams);
  }, [searchCars, searchParams, setSearchParams]);

  const handleRemoveFilter = useCallback((key) => {
    if (key === 'query') {
      handleSearch('');
      return;
    }

    const resetByKey = {
      brand: '',
      fuelType: '',
      transmission: '',
      minYear: 0,
      maxKm: 0,
      maxPrice: 5000000,
    };

    if (Object.prototype.hasOwnProperty.call(resetByKey, key)) {
      applyFilters({ [key]: resetByKey[key] });
    }
  }, [applyFilters, handleSearch]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <SearchInput value={filters.query} onSearch={handleSearch} placeholder="Search from 1000+ used cars" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <CarFilters cars={cars} filters={filters} onFilterChange={applyFilters} />

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600">
                Showing <span className="font-bold text-slate-900">{visibleCount}</span> cars (page {pagination.page} of{' '}
                {pagination.totalPages})
              </p>
              {appliedFilters.length ? (
                <div className="flex flex-wrap items-center gap-2">
                  {appliedFilters.map((filter) => (
                    <span
                      key={filter.key}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {filter.label}
                      <button
                        type="button"
                        onClick={() => handleRemoveFilter(filter.key)}
                        className="rounded-full text-slate-500 transition hover:text-slate-800"
                        aria-label={`Remove ${filter.label} filter`}
                      >
                        <FaTimes className="text-[10px]" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative min-w-[220px]">
              <select
                value={filters.sortBy}
                onChange={(event) => applyFilters({ sortBy: event.target.value })}
                className="h-11 w-full appearance-none rounded-lg border-2 border-slate-300 bg-white px-4 pr-10 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 [&>option]:bg-white [&>option]:text-slate-800"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-600" />
            </div>
          </div>

          {error ? (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">{error}</div>
          ) : null}

          {loading ? <Loader text="Fetching inventory..." /> : <CarList cars={filteredCars} />}

          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
