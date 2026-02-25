import { memo } from 'react';
import CarCard from './CarCard';

const CarList = memo(({ cars }) => {
  if (!cars.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-bold text-slate-900">No cars found</h3>
        <p className="mt-2 text-sm text-slate-600">Try changing filters or search with different keywords.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
});

CarList.displayName = 'CarList';

export default CarList;
