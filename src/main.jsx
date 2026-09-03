// 1. IMPORTATIONS
// React : librairie fondamentale pour créer des composants
import React from 'react';
// ReactDOM : module spécifique au Web pour manipuler le DOM (Document Object Model) du navigateur
import ReactDOM from 'react-dom/client';
// Provider : composant conteneur de "react-redux" qui rend le Store accessible à toute l'application
import { Provider } from 'react-redux';
// Importation de notre instance du Store Redux configurée dans redux/store.js
import { store } from './redux/store';
// Importation du composant racine App
import App from './App';

// 2. INITIALISATION DU POINT D'ANCRAGE DANS LE DOM
// ReactDOM.createRoot sélectionne la div HTML <div id="root"></div> (située dans index.html)
// et initialise le moteur de rendu React 18+ à cet emplacement exact.
ReactDOM.createRoot(document.getElementById('root')).render(
  // 3. ENCAPSULATION DES COMPOSANTS
  
  // <React.StrictMode>
  // Mode de vérification en développement. Il exécute certains effets deux fois pour
  // détecter d'éventuels bugs, fuites de mémoire ou pratiques obsolètes sans impacter la production.
  <React.StrictMode>
    
    {/* <Provider store={store}>
        Injecte le store Redux dans l'arbre des composants React.
        Grâce à lui, N'IMPORTE QUEL composant enfant (App, AddTask, ListTask, Task...)
        pourra utiliser useSelector() pour lire les données et useDispatch() pour déclencher des actions.
    */}
    <Provider store={store}>
      
      {/* Composant racine de l'application */}
      <App />
      
    </Provider>
  </React.StrictMode>
);