import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <div className="min-h-screen bg-page text-slate-900">
    <Navbar />
    <main>
      <AppRoutes />
    </main>
    <Footer />
  </div>
);

export default App;
