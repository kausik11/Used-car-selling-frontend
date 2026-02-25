import { FaChevronRight } from 'react-icons/fa';

const CarDetailsFaqSection = ({ items }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-black text-slate-900">Frequently Asked Questions</h2>
    <div className="mt-4 divide-y divide-slate-200">
      {items.map((item) => (
        <details key={item.q} className="group py-3">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
            <div className="flex items-center justify-between">
              <span>{item.q}</span>
              <FaChevronRight className="text-xs text-slate-500 transition group-open:rotate-90" />
            </div>
          </summary>
          <p className="mt-2 text-sm text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
);

export default CarDetailsFaqSection;

