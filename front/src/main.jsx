import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Sidebar from './Components/Sidebar.jsx'
import './style/index.css'
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="sidebar" element={<Sidebar />}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
