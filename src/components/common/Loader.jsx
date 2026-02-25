const Loader = ({ text = 'Loading cars...' }) => (
  <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-3">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-700" />
    <p className="text-sm font-medium text-slate-600">{text}</p>
  </div>
);

export default Loader;
