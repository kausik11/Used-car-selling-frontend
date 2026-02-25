import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { FaHandshake, FaWrench, FaRoad } from 'react-icons/fa';

const REASONS = [
  {
    id: 'best-price',
    number: '01',
    title: 'Best Price for Old Car',
    description:
      'We guarantee the highest market value for your used vehicle. Our transparent evaluation process and live auction model ensures you never leave money on the table.',
    emoji: '₹',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#eaad2b] bg-[#eaad2b]/10 text-5xl font-black text-[#eaad2b]">
          ₹
        </div>
        <p className="text-center text-2xl font-black text-[#fdfdff]">Highest Valuation</p>
        <p className="text-center text-sm text-[#fdfdff]/60">Guaranteed market-best price</p>
      </div>
    ),
  },
  {
    id: 'best-support',
    number: '02',
    title: 'Best Support Pre & Post Sell',
    description:
      'Our dedicated relationship managers are with you every step — from paperwork and inspections before the sale to RC transfer assistance long after.',
    emoji: '🤝',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#eaad2b] bg-[#eaad2b]/10 text-5xl text-[#eaad2b]">
          <FaHandshake />
        </div>
        <p className="text-center text-2xl font-black text-[#fdfdff]">360° Support</p>
        <p className="text-center text-sm text-[#fdfdff]/60">Before, during & after every deal</p>
      </div>
    ),
  },
  {
    id: 'free-service',
    number: '03',
    title: 'Free Service for One Year',
    description:
      'Every car purchased from Singh Group includes a full year of complimentary servicing — oil changes, fluid top-ups, and multi-point safety inspections.',
    emoji: '🔧',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#eaad2b] bg-[#eaad2b]/10 text-5xl text-[#eaad2b]">
          <FaWrench />
        </div>
        <p className="text-center text-2xl font-black text-[#fdfdff]">1 Year Free Service</p>
        <p className="text-center text-sm text-[#fdfdff]/60">Zero service cost for 12 months</p>
      </div>
    ),
  },
  {
    id: 'free-road-tax',
    number: '04',
    title: 'Free Road Tax',
    description:
      'We handle all road tax formalities and payment. Drive away without a single hidden charge — the price you see on the sticker is exactly what you pay.',
    emoji: '🛣',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#eaad2b] bg-[#eaad2b]/10 text-5xl text-[#eaad2b]">
          <FaRoad />
        </div>
        <p className="text-center text-2xl font-black text-[#fdfdff]">Zero Tax Hassle</p>
        <p className="text-center text-sm text-[#fdfdff]/60">Road tax fully covered by us</p>
      </div>
    ),
  },
  {
    id: 'best-emi',
    number: '05',
    title: 'Best Interest Rate on EMI',
    description:
      'Access exclusive financing partnerships with interest rates starting as low as 7.9% p.a. Compare, choose the best plan, and drive — all in one visit.',
    emoji: '%',
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#eaad2b] bg-[#eaad2b]/10 text-4xl font-black text-[#eaad2b]">
          %
        </div>
        <p className="text-center text-2xl font-black text-[#fdfdff]">From 7.9% p.a.</p>
        <p className="text-center text-sm text-[#fdfdff]/60">Lowest EMI rates guaranteed</p>
      </div>
    ),
  },
];

const LAST_STEP = REASONS.length - 1;

const WhyChooseSinghGroup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const itemRefs = useRef([]);
  const timelineItemRefs = useRef([]);
  const confettiCooldown = useRef(false);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(index);
        },
        { threshold: 0.55 },
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  useEffect(() => {
    if (activeStep !== LAST_STEP || confettiCooldown.current) return;

    confettiCooldown.current = true;

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#eaad2b', '#fdfdff', '#0f102e', '#ffd700', '#fff4b0'],
    });

    const timer = setTimeout(() => {
      confettiCooldown.current = false;
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeStep]);

  useEffect(() => {
    const activeItem = timelineItemRefs.current[activeStep];
    if (!activeItem) return;

    activeItem.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [activeStep]);

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:pb-[8rem] lg:px-8">
      {/* NOTE: no overflow-hidden on outer wrapper — needed for sticky to work */}
      <div className="rounded-3xl bg-[#141528]">

        {/* ── Header ── */}
        <div className="px-6 pb-4 pt-14 text-center sm:px-10 md:px-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#eaad2b]">Our Promise</p>
          <h2 className="mt-3 text-4xl font-black text-[#fdfdff] sm:text-5xl md:text-6xl">
            Why Choose{' '}
            <span className="text-[#eaad2b]">Singh Group</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#fdfdff]/60">
            Five commitments that set us apart from every dealership in the region.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-20 bg-[#eaad2b]" />
        </div>

        {/* ── DESKTOP: sticky-scroll layout ── */}
        <div className="hidden lg:flex lg:pt-12 xl:pt-14">

          {/* Left: scrolling visuals */}
          <div className="w-1/2 pl-10 pr-6">
            {REASONS.map((reason, index) => (
              <div
                key={reason.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="flex h-screen items-center justify-center"
              >
                <div className="relative">
                  {/* Golden offset shadow */}
                  <div className="absolute left-5 top-5 h-[310px] w-[310px] rounded-3xl bg-[#eaad2b]" />
                  {/* Main visual card */}
                  <div className="relative z-10 flex h-[310px] w-[310px] flex-col overflow-hidden rounded-3xl border border-[#eaad2b]/25 bg-[#0d0e24]">
                    {reason.visual}
                    {/* Watermark number */}
                    <span className="pointer-events-none absolute -bottom-3 -right-1 select-none text-[130px] font-black leading-none text-[#eaad2b]/8">
                      {reason.number}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* bottom spacer so sticky timeline fully exits before next section */}
            <div className="h-[55vh] xl:h-[40vh]" />
          </div>

          {/* Right: sticky timeline */}
          <div className="relative w-1/2">
            <div className="sticky top-32 flex h-[calc(100vh-8rem)] items-start justify-center pr-10 pt-8 xl:top-36 xl:h-[calc(100vh-9rem)] xl:pt-10">
              <div className="no-scrollbar w-full max-w-sm max-h-full overflow-y-auto">
                {REASONS.map((reason, index) => {
                  const isActive = activeStep === index;
                  const isPast = activeStep > index;
                  return (
                    <div
                      key={reason.id}
                      ref={(el) => {
                        timelineItemRefs.current[index] = el;
                      }}
                      className="flex gap-5"
                    >
                      {/* Bullet + connector line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black transition-all duration-500 ${
                            isActive
                              ? 'scale-110 border-[#eaad2b] bg-[#eaad2b] text-[#0f102e] shadow-[0_0_24px_rgba(234,173,43,0.45)]'
                              : isPast
                              ? 'border-[#eaad2b]/50 bg-[#eaad2b]/15 text-[#eaad2b]'
                              : 'border-[#fdfdff]/15 bg-transparent text-[#fdfdff]/25'
                          }`}
                        >
                          {reason.number}
                        </div>
                        {index < REASONS.length - 1 && (
                          <div
                            className={`min-h-[3.5rem] w-0.5 flex-1 transition-all duration-700 ${
                              isPast ? 'bg-[#eaad2b]/50' : 'bg-[#fdfdff]/10'
                            }`}
                          />
                        )}
                      </div>

                      {/* Text content */}
                      <div
                        className={`pb-10 xl:pb-14 transition-all duration-500 ${
                          isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-25'
                        }`}
                      >
                        <h3
                          className={`text-2xl font-black leading-tight transition-colors duration-500 ${
                            isActive ? 'text-[#eaad2b]' : 'text-[#fdfdff]'
                          }`}
                        >
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-[#fdfdff]/70">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: stacked cards ── */}
        <div className="space-y-0 px-4 py-10 lg:hidden sm:px-6">
          {REASONS.map((reason, index) => (
            <div key={reason.id} className="flex gap-4">
              {/* Bullet + line */}
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#eaad2b] bg-[#eaad2b] text-sm font-black text-[#0f102e]">
                  {reason.number}
                </div>
                {index < REASONS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#eaad2b]/30" style={{ minHeight: '2rem' }} />
                )}
              </div>
              {/* Card */}
              <div className="mb-5 flex-1 rounded-2xl border border-[#eaad2b]/20 bg-[#0d0e24] p-5">
                <h3 className="text-lg font-black text-[#eaad2b]">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#fdfdff]/70">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSinghGroup;
