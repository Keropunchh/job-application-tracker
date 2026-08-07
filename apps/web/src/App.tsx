import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from './AuthPage';
import { HomePage } from './HomePage';
import { ApplicationDetailPage } from './ApplicationDetailPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/applications/:id" element={<ApplicationDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
