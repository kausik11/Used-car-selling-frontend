import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaHeart, FaRegHeart, FaTimes, FaTrash } from 'react-icons/fa';
import { getSavedCars, removeSavedCar, SAVED_CARS_UPDATED_EVENT } from '../../utils/savedCars';

const exploreItems = [
  'Price Range',
  'Make and Model',
  'Year',
  'Fuel',
  'KM Driven',
  'Body Type',
  'Transmission',
];

const topLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
  }`;

const Navbar = () => {
  const navigate = useNavigate();
  const [savedCars, setSavedCars] = useState(() => getSavedCars());
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  useEffect(() => {
    const syncSavedCars = () => setSavedCars(getSavedCars());
    window.addEventListener('storage', syncSavedCars);
    window.addEventListener(SAVED_CARS_UPDATED_EVENT, syncSavedCars);

    return () => {
      window.removeEventListener('storage', syncSavedCars);
      window.removeEventListener(SAVED_CARS_UPDATED_EVENT, syncSavedCars);
    };
  }, []);

  const savedCount = savedCars.length;
  const hasSavedCars = useMemo(() => savedCount > 0, [savedCount]);

  const handleRemoveSavedCar = (carId) => {
    setSavedCars(removeSavedCar(carId));
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="border-b border-white/10 bg-[#0f102e]/95 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="rounded-md bg-rose-500 px-2 py-1 text-sm font-black uppercase text-white">S</span>
              <span className="text-3xl font-black italic text-white">Demo</span>
            </Link>

            {/* <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Kolkata ▾
              </button>
              <button
                type="button"
                onClick={() => navigate('/search')}
                className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
              >
                Search by body type
              </button>
            </div> */}
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            <NavLink to="/search" className={topLinkClass}>
              <span className="inline-flex items-center gap-1">Buy car <FaChevronDown className="h-3 w-3" /></span>
            </NavLink>
            <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              <span className="inline-flex items-center gap-1">Sell car <FaChevronDown className="h-3 w-3" /></span>
            </button>
            {/* <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Service car
            </button> */}
            {/* <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              <span className="inline-flex items-center gap-1">More <FaChevronDown className="h-3 w-3" /></span>
            </button> */}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSavedModalOpen(true)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="View saved cars"
            >
              {hasSavedCars ? <FaHeart className="text-rose-400" /> : <FaRegHeart />}
              {savedCount ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">
                  {savedCount}
                </span>
              ) : null}
            </button>

            <div className="hidden lg:block">
              <p className="text-xs text-white/70">Call us at</p>
              <p className="text-2xl font-extrabold leading-none text-white">727-727-7275</p>
            </div>
          </div>
        </nav>
      </div>

      <div className="bg-[#1a1b42] text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="shrink-0 pr-3 text-sm font-bold text-white/55">Explore By</span>

          {exploreItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => navigate('/search')}
              className="shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
            >
              <span className="inline-flex items-center gap-1">{item} <FaChevronDown className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
      </div>

      {isSavedModalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Saved Cars</h3>
                <p className="text-sm text-slate-500">{savedCount} car(s) saved</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSavedModalOpen(false)}
                className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close saved cars modal"
              >
                <FaTimes />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              {!hasSavedCars ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-600">No saved cars yet.</p>
              ) : (
                <div className="space-y-3">
                  {savedCars.map((car) => (
                    <article key={car.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                      <img
                        src={car.image || 'https://placehold.co/180x120/e2e8f0/334155?text=Car'}
                        alt={car.title}
                        className="h-20 w-28 rounded-lg bg-slate-100 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-900">{car.title}</p>
                        <p className="mt-0.5 text-sm font-semibold text-violet-700">
                          Rs {Number(car.price || 0).toLocaleString('en-IN')}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {car.year || 'N/A'} • {Number(car.kmDriven || 0).toLocaleString('en-IN')} km • {car.fuelType || 'N/A'} •{' '}
                          {car.transmission || 'N/A'} • {car.location || 'N/A'}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSavedModalOpen(false);
                            navigate(`/car/${car.id}`);
                          }}
                          className="rounded-lg bg-violet-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-violet-800"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSavedCar(car.id)}
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-rose-300 hover:text-rose-600"
                        >
                          <FaTrash className="text-[10px]" /> Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
