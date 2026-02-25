import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const FAQ_ITEMS = [
  {
    id: 'test-drive',
    question: 'Q. When and where can I take a test drive?',
    answer:
      'With our test drive booking form, you can conveniently schedule a test drive at home or visit our hub to try out multiple cars. Once you book your preferred option, your relationship manager will call you to confirm the details before arriving at your location.',
  },
  {
    id: 'booking-process',
    question: "Q. What's the process for booking my car?",
    answer:
      'Select your preferred car, book it online, and our team will guide you through payment, verification, and delivery. You can complete the process digitally or with in-branch support.',
  },
  {
    id: 'finance',
    question: 'Q. Will demo help me with car finance?',
    answer:
      'Yes. We offer used-car financing options with transparent terms and competitive rates. You can check eligibility, compare offers, and choose a repayment plan that suits you.',
  },
  {
    id: 'money-back',
    question: "Q. How does demo's money back guarantee work?",
    answer:
      'If your car is covered by our 5-day money back policy, you can return it within the eligible period after delivery, subject to policy terms and vehicle condition checks.',
  },
];

const FaqSection = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="relative space-y-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1f0f2e] via-[#122040] to-[#0d3434] px-4 py-8 text-[#fdfdff] shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:px-6 md:px-10">
        <div className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-white/20" />
          <h2 className="text-center text-3xl font-black text-[#fdfdff]">Frequently Asked Questions</h2>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="space-y-0.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.id} className="border-b border-white/20 py-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  className="flex w-full items-center justify-between gap-4 py-1 text-left"
                >
                  <span className="text-base font-bold text-[#fdfdff]">{item.question}</span>
                  <span className="text-base text-[#fdfdff]/70">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>

                {isOpen ? (
                  <p className="max-w-6xl pb-2 pt-3 text-base leading-relaxed text-[#fdfdff]/80">{item.answer}</p>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/faqs')}
            className="rounded-2xl border-2 border-[#eaad2b] px-14 py-3 text-base font-bold text-[#fdfdff] transition hover:bg-[#eaad2b] hover:text-[#0f102e]"
          >
            Visit help center
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl font-black text-[#fdfdff]">Why buy a used car from demo?</h3>
          <p className="text-base leading-relaxed text-[#fdfdff]/80">
            demo removes uncertainty from buying a used car by combining quality checks, transparent pricing, and a
            customer-first experience. Every certified car undergoes a comprehensive multi-point evaluation to ensure
            safety, reliability, and performance. You also get support with paperwork, RC transfer, financing options,
            and doorstep assistance. With fixed prices and a trustworthy process, demo helps you buy a pre-owned car
            with confidence and peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
