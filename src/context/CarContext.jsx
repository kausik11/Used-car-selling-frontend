/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';
import fallbackCars from '../mocks/cars.json';

const DEFAULT_FILTERS = {
  query: '',
  brand: '',
  fuelType: '',
  transmission: '',
  minYear: 0,
  maxKm: 0,
  sortBy: 'newest',
  minPrice: 0,
  maxPrice: 5000000,
};

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 6,
  total: 0,
  totalPages: 1,
};

const CarContext = createContext(null);

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.cars)) return payload.cars;
  return [];
};

const normalizeCar = (payload) => {
  if (!payload) return null;
  if (payload?.car) return payload.car;
  return payload;
};

const applyFilterLogic = (cars, filters) => {
  // Business rules stay in context so UI components remain presentational only.
  const query = filters.query.trim().toLowerCase();

  const filtered = cars.filter((car) => {
    const matchesQuery =
      !query ||
      [car.title, car.brand, car.model, car.location]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));

    const matchesBrand = !filters.brand || car.brand === filters.brand;
    const matchesFuel = !filters.fuelType || car.fuelType === filters.fuelType;
    const matchesTransmission = !filters.transmission || car.transmission === filters.transmission;
    const matchesYear = !filters.minYear || car.year >= filters.minYear;
    const matchesKm = !filters.maxKm || car.kmDriven <= filters.maxKm;
    const matchesPrice = car.price >= filters.minPrice && car.price <= filters.maxPrice;

    return matchesQuery && matchesBrand && matchesFuel && matchesTransmission && matchesYear && matchesKm && matchesPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'priceHighToLow':
        return b.price - a.price;
      case 'kmLowToHigh':
        return a.kmDriven - b.kmDriven;
      case 'yearNewest':
        return b.year - a.year;
      case 'yearOldest':
        return a.year - b.year;
      case 'newest':
      default:
        return Number(b.id) - Number(a.id);
    }
  });

  return sorted;
};

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [pagination, setPaginationState] = useState(DEFAULT_PAGINATION);
  const filtersRef = useRef(DEFAULT_FILTERS);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const recalculateVisibleCars = useCallback(
    (baseCars, nextFilters, targetPage = 1) => {
      // Single source of truth for filtering, sorting, and pagination slices.
      const processedCars = applyFilterLogic(baseCars, nextFilters);

      const total = processedCars.length;
      const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGINATION.limit));
      const safePage = Math.min(Math.max(1, targetPage), totalPages);
      const startIndex = (safePage - 1) * DEFAULT_PAGINATION.limit;
      const paginatedCars = processedCars.slice(startIndex, startIndex + DEFAULT_PAGINATION.limit);

      setFilteredCars(paginatedCars);
      setPaginationState((prev) => ({
        ...prev,
        page: safePage,
        total,
        totalPages,
      }));
    },
    [],
  );

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(ENDPOINTS.CARS);
      const carList = normalizeList(response.data);
      const safeCars = carList.length ? carList : fallbackCars;

      setCars(safeCars);
      recalculateVisibleCars(safeCars, filtersRef.current, 1);

      if (!carList.length) {
        setError('Live API returned empty data. Showing fallback catalog.');
      }
    } catch (apiError) {
      setCars(fallbackCars);
      recalculateVisibleCars(fallbackCars, filtersRef.current, 1);
      setError(`${apiError.message}. Showing fallback catalog.`);
    } finally {
      setLoading(false);
    }
  }, [recalculateVisibleCars]);

  const fetchCarById = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(ENDPOINTS.CAR_BY_ID(id));
        const car = normalizeCar(response.data);
        const selected = car || cars.find((item) => String(item.id) === String(id)) || null;
        setSelectedCar(selected);

        if (!selected) {
          setError('Car not found.');
        }
      } catch (apiError) {
        const localCar =
          cars.find((item) => String(item.id) === String(id)) ||
          fallbackCars.find((item) => String(item.id) === String(id)) ||
          null;

        setSelectedCar(localCar);
        if (!localCar) {
          setError(apiError.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [cars],
  );

  const applyFilters = useCallback(
    (nextFilters) => {
      setFilters((prev) => {
        const merged = { ...prev, ...nextFilters };
        recalculateVisibleCars(cars, merged, 1);
        return merged;
      });
    },
    [cars, recalculateVisibleCars],
  );

  const searchCars = useCallback(
    (query) => {
      applyFilters({ query });
    },
    [applyFilters],
  );

  const setPage = useCallback(
    (page) => {
      recalculateVisibleCars(cars, filters, page);
    },
    [cars, filters, recalculateVisibleCars],
  );

  const refetch = useCallback(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const value = useMemo(
    () => ({
      cars,
      filteredCars,
      selectedCar,
      loading,
      error,
      filters,
      pagination,
      fetchCars,
      fetchCarById,
      applyFilters,
      searchCars,
      setPage,
      refetch,
    }),
    [
      cars,
      filteredCars,
      selectedCar,
      loading,
      error,
      filters,
      pagination,
      fetchCars,
      fetchCarById,
      applyFilters,
      searchCars,
      setPage,
      refetch,
    ],
  );

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

export const useCars = () => useContext(CarContext);
