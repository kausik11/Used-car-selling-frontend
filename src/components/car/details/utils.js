export const formatNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num.toLocaleString('en-IN') : 'N/A';
};

