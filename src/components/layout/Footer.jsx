const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <h3 className="text-lg font-bold text-slate-900">SPINNY clone</h3>
        <p className="mt-3 text-sm text-slate-600">
          Trusted used cars with transparent pricing, doorstep test drives, and end-to-end financing.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">Popular Cities</h4>
        <p className="mt-3 text-sm text-slate-700">Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune</p>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">Support</h4>
        <p className="mt-3 text-sm text-slate-700">hello@spinny-clone.com</p>
        <p className="text-sm text-slate-700">+91 99999 00000</p>
      </div>
    </div>
  </footer>
);

export default Footer;
