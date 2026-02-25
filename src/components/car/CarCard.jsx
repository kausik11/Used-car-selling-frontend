import { memo } from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

const CarCard = memo(({ car }) => (
  <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative h-52 overflow-hidden">
      <img
        src={car.images?.[0]}
        alt={car.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {car.featured ? (
        <span className="absolute left-3 top-3 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">
          Featured
        </span>
      ) : null}
    </div>

    <div className="space-y-3 p-4">
      <h3 className="truncate text-lg font-bold text-slate-900">{car.title}</h3>

      <p className="text-sm text-slate-600">
        {car.year} • {car.kmDriven.toLocaleString('en-IN')} km • {car.fuelType} • {car.transmission}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-xl font-black text-slate-900">Rs {formatPrice(car.price)}</p>
        <p className="text-xs text-slate-500">EMI from Rs {formatPrice(car.emi)}</p>
      </div>

      <Link
        to={`/car/${car.id}`}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        View Details
      </Link>
    </div>
  </article>
));

CarCard.displayName = 'CarCard';

export default CarCard;
