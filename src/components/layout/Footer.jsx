import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';

const footerGroups = [
  {
    title: 'Company',
    links: ['Assured Cars', 'Who we are', 'Careers', 'Blog', 'Customer reviews', 'FAQ', 'Sitemap'],
  },
  {
    title: 'Offerings',
    links: ['Buy car', 'Sell car', 'Used car loan', 'Car service', 'Car insurance', 'Partners'],
  },
  {
    title: 'Car Servicing',
    links: ['Periodic service', 'AC servicing', 'Clutch & suspension', 'Health check services', 'Wheel care'],
  },
  {
    title: 'Processes',
    links: ['How buying works', 'Inspection process', 'Quality checks'],
  },
  {
    title: 'Finance & Tools',
    links: ['Service cost calculator', 'EMI calculator', 'Loan eligibility'],
  },
  {
    title: 'Contact Us',
    links: ['Trade with us', 'Connect with us', 'hello@demo-cars.com'],
  },
];

const Footer = () => (
  <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-[#2a0550]">
    <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl" />

    <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:px-8">
      <section className="space-y-6 text-white">
        <div className="inline-flex items-center gap-3">
          <img src="/singh_logo.jpeg" alt="Singh Group logo" className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/20" />
          <span className="text-3xl font-black italic">Singh Group</span>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-white/85">
          Singh Group is a trusted destination for buying and selling used cars. Explore certified inventory, schedule
          test drives at your convenience, and get transparent pricing with a customer-first experience.
        </p>

        <p className="text-lg font-semibold text-white/90">(* ) subject to certain terms and conditions.</p>

        <div className="flex items-center gap-3">
          {[FaInstagram, FaLinkedin, FaFacebook, FaXTwitter].map((Icon, index) => (
            <button
              key={`social-${index + 1}`}
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-xl text-white transition hover:bg-white/10"
            >
              <Icon />
            </button>
          ))}
        </div>

        <div className="space-y-2 text-sm text-white/85">
          <p>© 2026 Singh Group Technologies Private Limited. All rights reserved.</p>
          <p>CIN: U74999HR2019PTC077781</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff1f61] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#ff2f6d]"
          >
            <FaPhoneAlt /> 98740-74477
          </button>
          <button type="button" className="rounded-xl border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Get Instant Quotes
          </button>
          <button type="button" className="rounded-xl border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Browse Cars
          </button>
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h4 className="text-sm font-black uppercase tracking-wide text-white">{group.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/90">
              {group.links.map((item) => (
                <li key={item}>
                  <button type="button" className="text-left transition hover:text-[#eaad2b]">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  </footer>
);

export default Footer;
