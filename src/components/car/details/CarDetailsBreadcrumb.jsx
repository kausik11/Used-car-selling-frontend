import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CarDetailsBreadcrumb = ({ car }) => {
  const locationLabel = String(car.location || 'your city').toUpperCase();
  const brandLabel = String(car.brand || 'brand').toUpperCase();
  const modelLabel = String(car.model || 'car').toUpperCase();
  const yearLabel = String(car.year || '').trim();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500"
    >
      <Link to="/" className="text-slate-800 transition hover:text-violet-700">
        Home
      </Link>
      <FaChevronRight className="text-[10px] text-slate-400" />
      <Link to={`/search?q=${encodeURIComponent(car.location || '')}`} className="text-slate-800 transition hover:text-violet-700">
        Used Cars In {locationLabel}
      </Link>
      <FaChevronRight className="text-[10px] text-slate-400" />
      <Link to={`/search?q=${encodeURIComponent(car.brand || '')}`} className="text-slate-800 transition hover:text-violet-700">
        {brandLabel} Cars
      </Link>
      <FaChevronRight className="text-[10px] text-slate-400" />
      <span className="text-slate-400">
        Used {yearLabel ? `${yearLabel} ` : ''}
        {brandLabel} {modelLabel} Cars
      </span>
    </nav>
  );
};

export default CarDetailsBreadcrumb;

