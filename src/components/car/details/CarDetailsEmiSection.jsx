import { FaChevronRight } from 'react-icons/fa';

const CarDetailsEmiSection = ({
  carPrice,
  emi,
  formatNumber,
  loanAmount,
  loanYears,
  onDownPaymentChange,
  onLoanYearsChange,
  safeDownPayment,
  totalPayable,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-black text-slate-900">EMI Calculator</h2>

    <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-semibold text-slate-600">Estimated EMI</p>
        <p className="mt-2 text-4xl font-black text-violet-700">Rs {formatNumber(emi)}</p>
        <p className="text-xs text-slate-500">per month</p>

        <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Principal Amount</span>
            <span className="font-semibold text-slate-900">Rs {formatNumber(loanAmount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Total Payable</span>
            <span className="font-semibold text-slate-900">Rs {formatNumber(totalPayable)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Interest (Indicative)</span>
            <span className="font-semibold text-slate-900">9% p.a.</span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="downPayment" className="mb-2 block text-sm font-semibold text-slate-700">
            Down Payment
          </label>
          <input
            id="downPayment"
            type="range"
            min="0"
            max={carPrice}
            step="10000"
            value={safeDownPayment}
            onChange={onDownPaymentChange}
            className="w-full accent-violet-700"
          />
          <p className="mt-2 text-sm text-slate-600">Rs {formatNumber(safeDownPayment)}</p>
        </div>

        <label htmlFor="loanYears" className="mb-2 block text-sm font-semibold text-slate-700">
          Loan Tenure (Years)
        </label>
        <select
          id="loanYears"
          value={loanYears}
          onChange={onLoanYearsChange}
          className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-violet-500"
        >
          <option value={3}>3 Years</option>
          <option value={4}>4 Years</option>
          <option value={5}>5 Years</option>
          <option value={6}>6 Years</option>
          <option value={7}>7 Years</option>
        </select>

        <button
          type="button"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-800"
        >
          Check Eligibility <FaChevronRight />
        </button>
      </div>
    </div>
  </div>
);

export default CarDetailsEmiSection;

