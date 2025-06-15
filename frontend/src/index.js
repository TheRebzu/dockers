import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Import du CSS principal
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Suppression du loader de chargement une fois React monté
const loadingContainer = document.querySelector('.loading-container');
if (loadingContainer) {
  loadingContainer.remove();
}
