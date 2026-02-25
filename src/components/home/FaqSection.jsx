import { useState } from 'react';

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
    question: 'Q. Will Spinny help me with car finance?',
    answer:
      'Yes. We offer used-car financing options with transparent terms and competitive rates. You can check eligibility, compare offers, and choose a repayment plan that suits you.',
  },
  {
    id: 'money-back',
    question: "Q. How does Spinny's money back guarantee work?",
    answer:
      'If your car is covered by our 5-day money back policy, you can return it within the eligible period after delivery, subject to policy terms and vehicle condition checks.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="space-y-10 rounded-3xl bg-[#f7f5f9] px-4 py-8 text-[#230a67] sm:px-6 md:px-10">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-slate-300" />
          <h2 className="text-center text-4xl font-black text-[#220a67]">Frequently Asked Questions</h2>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <div className="space-y-0.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.id} className="border-b border-slate-300 py-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  className="flex w-full items-center justify-between gap-4 py-1 text-left"
                >
                  <span className="text-lg font-bold text-[#230a67]">{item.question}</span>
                  <span className="text-3xl font-bold leading-none text-[#4c1982]">{isOpen ? '⌃' : '⌄'}</span>
                </button>

                {isOpen ? (
                  <p className="max-w-6xl pb-2 pt-3 text-[22px] leading-relaxed text-[#28106d]">{item.answer}</p>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-2xl border-2 border-[#6c15b8] px-14 py-3 text-lg font-bold text-[#6c15b8] transition hover:bg-[#6c15b8] hover:text-white"
          >
            Visit help center
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-4xl font-black text-[#230a67]">Why buy a used car from Spinny?</h3>
          <p className="text-[22px] leading-relaxed text-[#2d136f]">
            Spinny removes uncertainty from buying a used car by combining quality checks, transparent pricing, and a
            customer-first experience. Every certified car undergoes a comprehensive multi-point evaluation to ensure
            safety, reliability, and performance. You also get support with paperwork, RC transfer, financing options,
            and doorstep assistance. With fixed prices and a trustworthy process, Spinny helps you buy a pre-owned car
            with confidence and peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
