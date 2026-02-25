import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
    <div className="group relative w-full">
      {/* Golden glow ring on focus — rendered behind the input */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-[#eaad2b]/40 via-[#eaad2b]/20 to-[#eaad2b]/40 opacity-0 blur-sm transition-opacity duration-300 group-focus-within:opacity-100" />

      {/* Search icon */}
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <FaSearch className="h-5 w-5 text-[#eaad2b]/70 transition-colors duration-200 group-focus-within:text-[#eaad2b]" />
      </span>

      <input
        type="search"
        value={inputValue}
        onChange={(event) => {
          hasInteracted.current = true;
          setInputValue(event.target.value);
        }}
        placeholder={placeholder}
        className="relative h-14 w-full rounded-2xl border border-[#eaad2b]/30 bg-[#0f102e]/80 pl-12 pr-5 text-[15px] font-medium text-[#fdfdff] shadow-[0_2px_24px_rgba(0,0,0,0.35)] outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-[#fdfdff]/35 focus:border-[#eaad2b]/70 focus:bg-[#0f102e] focus:shadow-[0_0_0_3px_rgba(234,173,43,0.18),0_4px_32px_rgba(0,0,0,0.45)]"
      />

      {/* Right-side search button */}
      <button
        type="button"
        onClick={() => {
          hasInteracted.current = true;
          onSearchRef.current(inputValue);
        }}
        className="absolute inset-y-2 right-2 flex items-center gap-2 rounded-xl bg-[#eaad2b] px-5 text-sm font-black text-[#0f102e] transition-all duration-200 hover:bg-[#eaad2b]/85 active:scale-95"
      >
        <FaSearch className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
};

export default SearchInput;
