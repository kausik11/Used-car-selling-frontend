import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Home = lazy(() => import('../pages/Home'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
const CarDetails = lazy(() => import('../pages/CarDetails'));

const AppRoutes = () => (
  <Suspense fallback={<Loader text="Loading page..." />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
