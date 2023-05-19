import { Route, Routes } from 'react-router-dom';
import { PrivateOutlet } from './components/PrivateOutlet';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<PrivateOutlet />}>
        <Route path="" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export { App };
