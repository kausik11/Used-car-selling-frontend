import { useMemo, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaTimes } from 'react-icons/fa';

const FAQ_BY_CATEGORY = {
  Buying: [
    {
      q: 'How do I book a car online?',
      a: 'Select your preferred car, review details, and proceed with booking. Our team then contacts you for confirmation and next steps.',
    },
    {
      q: 'Can I take a test drive before buying?',
      a: 'Yes. You can schedule a doorstep test drive or visit our hub based on city availability.',
    },
    {
      q: 'Do you provide finance options?',
      a: 'Yes, we provide financing support with partner banks and NBFCs, including EMI plan guidance.',
    },
  ],
  Selling: [
    {
      q: 'How do I get a price quote for my car?',
      a: 'Share your car details, and we provide an estimated quote after preliminary checks and inspection.',
    },
    {
      q: 'What documents are needed to sell my car?',
      a: 'Typically RC, insurance, PUC, ID proof, and address proof are required. Additional documents may be requested case-by-case.',
    },
    {
      q: 'How quickly will I get paid?',
      a: 'Payment is usually processed quickly after paperwork and ownership transfer process initiation.',
    },
  ],
  'Post-Sale Support for Car Sellers': [
    {
      q: 'Will you help with transfer formalities after sale?',
      a: 'Yes, our support team guides you through documentation and transfer process updates.',
    },
    {
      q: 'Can I track status after I sell my car?',
      a: 'Yes, you can contact support for live updates regarding post-sale and transfer status.',
    },
  ],
  'Post-Sale Support for Car Buyers': [
    {
      q: 'Do I get support after purchase?',
      a: 'Yes, we assist with RC transfer progress, service queries, and purchase-related support.',
    },
    {
      q: 'Is there any return policy available?',
      a: 'Eligible cars may include a return window as per policy terms and vehicle condition checks.',
    },
  ],
  General: [
    {
      q: 'What cities do you currently serve?',
      a: 'We serve multiple major cities and continue expanding. Please check with support for latest city coverage.',
    },
    {
      q: 'How can I contact support quickly?',
      a: 'You can reach us via phone, WhatsApp, or the contact form on the Contact Us page.',
    },
  ],
};

const CATEGORY_ORDER = [
  'Buying',
  'Selling',
  'Post-Sale Support for Car Sellers',
  'Post-Sale Support for Car Buyers',
  'General',
];

const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState('Buying');
  const [openItemKey, setOpenItemKey] = useState('Buying-0');
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const faqs = useMemo(() => FAQ_BY_CATEGORY[activeCategory] || [], [activeCategory]);
  const allFaqs = useMemo(
    () =>
      CATEGORY_ORDER.flatMap((category) =>
        (FAQ_BY_CATEGORY[category] || []).map((item, index) => ({
          ...item,
          category,
          key: `${category}-${index}`,
        })),
      ),
    [],
  );
  const filteredFaqs = useMemo(() => {
    if (!isSearching) return [];
    return allFaqs.filter(
      (item) =>
        item.q.toLowerCase().includes(normalizedQuery) ||
        item.a.toLowerCase().includes(normalizedQuery),
    );
  }, [allFaqs, isSearching, normalizedQuery]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#180e2c] via-[#122042] to-[#0f323f] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
        <h1 className="text-center text-3xl font-black text-white sm:text-4xl">FAQs by Category</h1>
        <p className="mt-2 text-center text-sm text-white/75">Pick a category to view relevant questions and answers.</p>
        <div className="mx-auto mt-6 max-w-3xl">
          <div className="relative">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/60" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenItemKey(null);
              }}
              placeholder="Search any question or answer..."
              className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-9 pr-10 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#eaad2b]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORY_ORDER.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setOpenItemKey(`${category}-0`);
                setQuery('');
              }}
              className={`rounded-xl border px-4 py-5 text-sm font-semibold transition sm:text-base ${
                activeCategory === category
                  ? 'border-[#eaad2b] bg-[#eaad2b]/10 text-[#eaad2b]'
                  : 'border-rose-400/70 bg-white/5 text-rose-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          {isSearching ? (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-white">Search Results ({filteredFaqs.length})</h2>

              {filteredFaqs.length ? (
                <div className="divide-y divide-white/10">
                  {filteredFaqs.map((item) => {
                    const isOpen = openItemKey === item.key;
                    return (
                      <article key={`${item.key}-${item.q}`} className="py-3">
                        <button
                          type="button"
                          onClick={() => setOpenItemKey((current) => (current === item.key ? null : item.key))}
                          className="flex w-full items-center justify-between gap-4 text-left"
                        >
                          <span className="space-y-1">
                            <span className="block text-xs font-bold uppercase tracking-wide text-[#eaad2b]">{item.category}</span>
                            <span className="block text-sm font-semibold text-white sm:text-base">{item.q}</span>
                          </span>
                          <span className="text-white/70">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                        </button>
                        {isOpen ? <p className="pt-3 text-sm leading-relaxed text-white/80 sm:text-base">{item.a}</p> : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-white/80">No matches found. Try another keyword.</p>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black text-white">{activeCategory}</h2>
              <div className="mt-4 divide-y divide-white/10">
                {faqs.map((item, index) => {
                  const key = `${activeCategory}-${index}`;
                  const isOpen = openItemKey === key;
                  return (
                    <article key={`${key}-${item.q}`} className="py-3">
                      <button
                        type="button"
                        onClick={() => setOpenItemKey((current) => (current === key ? null : key))}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
                        <span className="text-white/70">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                      </button>
                      {isOpen ? <p className="pt-3 text-sm leading-relaxed text-white/80 sm:text-base">{item.a}</p> : null}
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
