import { memo } from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

const CarCard = memo(({ car }) => (
  <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
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
      <h3 className="truncate text-lg font-bold text-[#0f102e]">{car.title}</h3>

      <p className="text-sm text-[#eaad2b]">
        {car.year} • {car.kmDriven.toLocaleString('en-IN')} km • {car.fuelType} • {car.transmission}
      </p>

      <div className="flex items-center justify-between">
        {/* text-[#eaad2b]*/}
        <p className="text-xl font-black text-[#0f102e] ">Rs {formatPrice(car.price)}</p>
        {/* <p className="text-xs text-[#eaad2b]">EMI from Rs {formatPrice(car.emi)}</p> */}
      </div>

      <Link
        to={`/car/${car.id}`}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#eaad2b] px-4 py-2.5 text-sm font-semibold text-[#0f102e] transition hover:bg-[#eaad2b]/85"
      >
        View Details
      </Link>
    </div>
  </article>
));

CarCard.displayName = 'CarCard';

export default CarCard;
