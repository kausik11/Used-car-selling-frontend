import { useCallback, useEffect, useMemo } from 'react';
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

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <SearchInput value={filters.query} onSearch={handleSearch} placeholder="Search from 1000+ used cars" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <CarFilters cars={cars} filters={filters} onFilterChange={applyFilters} />

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Showing <span className="font-bold text-slate-900">{visibleCount}</span> cars (page {pagination.page} of{' '}
              {pagination.totalPages})
            </p>

            <select
              value={filters.sortBy}
              onChange={(event) => applyFilters({ sortBy: event.target.value })}
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-medium outline-none focus:border-brand-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
