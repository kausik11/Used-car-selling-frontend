import { useState } from 'react';
import { FaCarSide, FaCalendarCheck, FaClock, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const TIME_SLOTS = ['10:00 AM', '12:00 PM', '2:30 PM', '4:30 PM', '6:00 PM'];

const TestDrive = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0d0f2e] via-[#1a1440] to-[#0c2b3a] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-24 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200/80">Premium Experience</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Book a <span className="text-amber-300">Private Test Drive</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Get a doorstep test drive with expert guidance, vehicle walkthrough, and transparent details before you decide.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <FaCarSide className="text-2xl text-amber-300" />
                <p className="mt-2 text-lg font-bold">Curated Inventory</p>
                <p className="mt-1 text-sm text-white/75">Handpicked vehicles with verified quality reports.</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <FaShieldAlt className="text-2xl text-emerald-300" />
                <p className="mt-2 text-lg font-bold">Trusted Support</p>
                <p className="mt-1 text-sm text-white/75">Dedicated relationship manager from booking to delivery.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl sm:p-7">
            <h2 className="text-2xl font-black text-slate-900">Schedule Your Slot</h2>
            <p className="mt-1 text-sm text-slate-500">Complete the form and our team will confirm your booking.</p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-500"
                required
              />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-500"
                required
              />
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="City"
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-500"
                required
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="rounded-xl border border-slate-300 px-3 py-2">
                  <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <FaCalendarCheck /> Date
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="w-full border-none p-0 text-sm text-slate-800 outline-none"
                    required
                  />
                </label>

                <label className="rounded-xl border border-slate-300 px-3 py-2">
                  <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <FaClock /> Time
                  </span>
                  <select
                    value={timeSlot}
                    onChange={(event) => setTimeSlot(event.target.value)}
                    className="w-full border-none bg-transparent p-0 text-sm text-slate-800 outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:from-cyan-400 hover:to-blue-500"
              >
                Confirm Test Drive
              </button>
            </form>

            {submitted ? (
              <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                Booking request received. We will contact you shortly.
              </div>
            ) : null}

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">
              <FaMapMarkerAlt className="text-cyan-600" />
              Doorstep available in major cities. Same-day slots subject to availability.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDrive;

