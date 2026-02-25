import { FaChevronRight } from 'react-icons/fa';

const CarDetailsExploreSection = ({ items }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-black text-slate-900">Explore More</h2>
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <button key={item} type="button" className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-left">
          <span className="text-sm font-semibold text-slate-700">{item}</span>
          <FaChevronRight className="text-violet-700" />
        </button>
      ))}
    </div>
  </div>
);

export default CarDetailsExploreSection;

