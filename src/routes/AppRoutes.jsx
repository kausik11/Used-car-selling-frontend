import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Home = lazy(() => import('../pages/Home'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
const CarDetails = lazy(() => import('../pages/CarDetails'));
const Auth = lazy(() => import('../pages/Auth'));
const TestDrive = lazy(() => import('../pages/TestDrive'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const Faqs = lazy(() => import('../pages/Faqs'));

const AppRoutes = () => (
  <Suspense fallback={<Loader text="Loading page..." />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/test-drive" element={<TestDrive />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
