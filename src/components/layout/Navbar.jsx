import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaHeart, FaRegHeart, FaTimes, FaTrash, FaUserCircle } from 'react-icons/fa';
import { getSavedCars, removeSavedCar, SAVED_CARS_UPDATED_EVENT } from '../../utils/savedCars';

const exploreItems = [
  'Price Range',
  'Brand',
  'Year',
  'Fuel',
  'KM Driven',
  'Body Type',
  'Transmission',
];

const priceRangeItems = ['Under 3 Lakh', '3 - 4 Lakh', '4 - 5 Lakh', '5 - 6 Lakh', '6 - 8 Lakh', '8 - 10 Lakh', 'Above 10 Lakh'];
const brandItems = ['Honda', 'Hyundai', 'Kia', 'Mahindra', 'Maruti', 'Skoda', 'Tata', 'Volkswagen'];
const yearItems = ['2024 & above', '2022 & above', '2020 & above', '2018 & above', '2016 & above', '2014 & above', '2012 & above', '2010 & above'];
const fuelItems = ['Petrol', 'Diesel', 'CNG'];
const kmDrivenItems = [
  '10,000 kms or less',
  '30,000 kms or less',
  '50,000 kms or less',
  '75,000 kms or less',
  '1,00,000 kms or less',
  '1,25,000 kms or less',
  '1,50,000 kms or less',
  '1,75,000 kms or less',
];
const bodyTypeItems = ['Hatchback', 'Sedan', 'SUV', 'MUV'];
const transmissionItems = ['Automatic', 'Manual'];

const topLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
  }`;

const Navbar = () => {
  const navigate = useNavigate();
  const [savedCars, setSavedCars] = useState(() => getSavedCars());
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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

  useEffect(() => {
    if (!isAccountOpen) return undefined;

    const handleOutside = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-account-menu]')) return;
      setIsAccountOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsAccountOpen(false);
    };

    window.addEventListener('click', handleOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('click', handleOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isAccountOpen]);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="border-b border-white/10 bg-[#0f102e]/95 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="rounded-md bg-rose-500 px-2 py-1 text-sm font-black uppercase text-white">S</span>
              <span className="text-3xl font-black italic text-white">Singh Group</span>
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
            <NavLink to="/test-drive" className={topLinkClass}>
              Test Drive
            </NavLink>
            <NavLink to="/contact-us" className={topLinkClass}>
              Contact Us
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" data-account-menu>
              <button
                type="button"
                onClick={() => setIsAccountOpen((open) => !open)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-3 text-sm font-semibold text-white transition hover:bg-white/10"
                aria-haspopup="menu"
                aria-expanded={isAccountOpen}
                aria-label="Account menu"
              >
                <FaUserCircle className="text-base" />
                <span className="hidden sm:inline">Account</span>
                <FaChevronDown className={`h-3 w-3 transition ${isAccountOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAccountOpen ? (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigate('/');
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    role="menuitem"
                  >
                    Your account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigate('/login');
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    role="menuitem"
                  >
                    Login/Signup
                  </button>
                </div>
              ) : null}
            </div>

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
              <p className="text-2xl font-extrabold leading-none text-white">9874074477</p>
            </div>
          </div>
        </nav>
      </div>

      <div className="bg-[#1a1b42] text-white">
        <div className="no-scrollbar mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:overflow-visible lg:px-8">
          <span className="shrink-0 pr-3 text-sm font-bold text-white/55">Explore By</span>

          {exploreItems.map((item) => (
            item === 'Price Range' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[210px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {priceRangeItems.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(range)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            ) : item === 'Brand' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[210px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {brandItems.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(brand)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            ) : item === 'Year' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[210px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {yearItems.map((yearLabel) => (
                    <button
                      key={yearLabel}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(yearLabel)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {yearLabel}
                    </button>
                  ))}
                </div>
              </div>
            ) : item === 'Fuel' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[170px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {fuelItems.map((fuelLabel) => (
                    <button
                      key={fuelLabel}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(fuelLabel)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {fuelLabel}
                    </button>
                  ))}
                </div>
              </div>
            ) : item === 'KM Driven' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[250px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {kmDrivenItems.map((kmLabel) => (
                    <button
                      key={kmLabel}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(kmLabel)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {kmLabel}
                    </button>
                  ))}
                </div>
              </div>
            ) : item === 'Body Type' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[170px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {bodyTypeItems.map((bodyTypeLabel) => (
                    <button
                      key={bodyTypeLabel}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(bodyTypeLabel)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {bodyTypeLabel}
                    </button>
                  ))}
                </div>
              </div>
            ) : item === 'Transmission' ? (
              <div key={item} className="group relative shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-1">
                    {item} <FaChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
                  </span>
                </button>

                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[170px] origin-top scale-95 rounded-b-md rounded-tr-md border border-white/10 bg-[#1a1b42] py-3 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {transmissionItems.map((transmissionLabel) => (
                    <button
                      key={transmissionLabel}
                      type="button"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(transmissionLabel)}`)}
                      className="block w-full px-4 py-2 text-left text-[18px] font-semibold text-white transition hover:bg-[#eaad2b]/15 hover:text-[#eaad2b]"
                    >
                      {transmissionLabel}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => navigate('/search')}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-1">
                  {item} <FaChevronDown className="h-3 w-3" />
                </span>
              </button>
            )
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
