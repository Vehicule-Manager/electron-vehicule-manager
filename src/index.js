import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Accueil from './pages/accueil';
import Login from './pages/login';
import Client from './pages/client';
import Contrat from './pages/contrat';
import Cars from './pages/voiture';
import Articles from "./pages/articles";
import AddClient from './pages/addClient';
import AddArticles from "./pages/addArticles";

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/client" element={<Client />} />
        <Route path="/add/client" element={<AddClient />} />
        <Route path="/add/article" element={<AddArticles />} />
        <Route path="/contrat" element={<Contrat />} />
        <Route path="/voiture" element={<Cars />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


