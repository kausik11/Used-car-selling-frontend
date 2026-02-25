export const SAVED_CARS_STORAGE_KEY = 'savedCars';
export const SAVED_CARS_UPDATED_EVENT = 'saved-cars-updated';

export const getSavedCars = () => {
  try {
    const raw = localStorage.getItem(SAVED_CARS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const isCarSaved = (carId) => getSavedCars().some((car) => String(car.id) === String(carId));

export const saveOrToggleCar = (car) => {
  const current = getSavedCars();
  const exists = current.some((item) => String(item.id) === String(car.id));

  const next = exists
    ? current.filter((item) => String(item.id) !== String(car.id))
    : [
        {
          id: car.id,
          title: car.title,
          price: car.price,
          year: car.year,
          kmDriven: car.kmDriven,
          fuelType: car.fuelType,
          transmission: car.transmission,
          location: car.location,
          image: Array.isArray(car.images) && car.images.length ? car.images[0] : '',
        },
        ...current,
      ];

  localStorage.setItem(SAVED_CARS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SAVED_CARS_UPDATED_EVENT));
  return { next, exists };
};

export const removeSavedCar = (carId) => {
  const next = getSavedCars().filter((car) => String(car.id) !== String(carId));
  localStorage.setItem(SAVED_CARS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SAVED_CARS_UPDATED_EVENT));
  return next;
};

