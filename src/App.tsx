import React from 'react';

import './App.css';
import AutoComplete from './pages/auto-complete';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import People from './pages/people';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<AutoComplete />} />
        <Route path="people" element={<People />} />
      </Routes>
    </div>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
