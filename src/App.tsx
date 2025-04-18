
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MusicPlayer from './pages/MusicPlayer';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MusicPlayer />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
