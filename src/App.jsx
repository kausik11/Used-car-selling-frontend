import { useLocation } from 'react-router-dom';
import WhatsAppFloatButton from './components/common/WhatsAppFloatButton';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const { pathname } = useLocation();
  const hideNavbar = pathname === '/login' || pathname === '/signup';

  return (
    <div className="min-h-screen bg-page text-slate-900">
      {!hideNavbar ? <Navbar /> : null}
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
};

export default App;
