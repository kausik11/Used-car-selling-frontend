import { Link, NavLink, useNavigate } from 'react-router-dom';

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
              Buy car ▾
            </NavLink>
            <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Sell car ▾
            </button>
            <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Service car
            </button>
            <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              More ▾
            </button>
          </div>

          <div className="hidden lg:block">
            <p className="text-xs text-white/70">Call us at</p>
            <p className="text-2xl font-extrabold leading-none text-white">727-727-7275</p>
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
              {item} ▾
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
