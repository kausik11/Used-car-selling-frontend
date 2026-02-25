import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRegClock, FaHeadset } from 'react-icons/fa';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-tr from-[#1b0f28] via-[#101f3b] to-[#0b3133] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="mb-8 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xl font-black text-white">Store Location</h3>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Visit Us</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/20">
            <iframe
              title="Demo Cars store location map"
              src="https://www.google.com/maps?q=Kolkata,West+Bengal&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[380px]"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="space-y-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-200/80">Concierge Desk</p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              Let us <span className="text-emerald-300">assist you</span> personally
            </h1>
            <p className="text-base leading-relaxed text-white/80">
              Reach out for assistance with car selection, financing, exchange, or test-drive scheduling.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <FaPhoneAlt className="mt-0.5 text-emerald-300" />
                <div>
                  <p className="text-sm font-bold">Call Us</p>
                  <p className="text-sm text-white/80">+91 98740 74477</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <FaEnvelope className="mt-0.5 text-emerald-300" />
                <div>
                  <p className="text-sm font-bold">Email</p>
                  <p className="text-sm text-white/80">support@demo-cars.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <FaMapMarkerAlt className="mt-0.5 text-emerald-300" />
                <div>
                  <p className="text-sm font-bold">Head Office</p>
                  <p className="text-sm text-white/80">Kolkata, West Bengal</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <FaRegClock className="mt-0.5 text-emerald-300" />
                <div>
                  <p className="text-sm font-bold">Working Hours</p>
                  <p className="text-sm text-white/80">Mon - Sat: 9:30 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl sm:p-7">
            <h2 className="text-2xl font-black text-slate-900">Contact Us</h2>
            <p className="mt-1 text-sm text-slate-500">Our team usually responds within 30 minutes during business hours.</p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500"
                  required
                />
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone number"
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500"
                  required
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500"
                required
              />
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your message..."
                rows={6}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
                required
              />

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:from-emerald-400 hover:to-teal-500"
              >
                <FaHeadset /> Send Message
              </button>
            </form>

            {submitted ? (
              <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                Message sent successfully. Our team will contact you soon.
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
