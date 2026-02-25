import { useEffect, useRef, useState } from 'react';

const SearchInput = ({ value = '', onSearch, placeholder = 'Search by car, brand, city...', delay = 450 }) => {
  const [inputValue, setInputValue] = useState(value);
  const initialRender = useRef(true);
  const hasInteracted = useRef(false);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return undefined;
    }

    if (!hasInteracted.current) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      onSearchRef.current(inputValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inputValue, delay]);

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={inputValue}
        onChange={(event) => {
          hasInteracted.current = true;
          setInputValue(event.target.value);
        }}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
};

export default SearchInput;
