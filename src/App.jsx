// 1. IMPORTATIONS DES COMPOSANTS ET DE DES STYLES
// Composant pour la saisie et l'ajout de nouvelles tâches
import { AddTask } from './component/AddTask';
// Composant pour l'affichage, le filtrage et la suppression des tâches
import { ListTask } from './component/ListTask';
// Composant d'action pour basculer entre le mode clair et le mode sombre
import { ThemeToggle } from './component/ThemeToggle';
// Importation du fichier CSS global
import './App.css';

// 2. COMPOSANT RACINE
export default function App() {
  return (
    /* CONTENEUR GLOBAL (PAGE COMPLÈTE)
       - min-h-screen : force le conteneur à occuper au moins toute la hauteur de l'écran
       - bg-slate-100 / dark:bg-slate-950 : couleur de fond s'adaptant au thème clair/sombre
       - transition-colors : adoucit le passage d'un thème à un autre
    */
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-10 px-4 transition-colors">
      
      {/* CARTE CENTRALE (APPLICATION REDUX)
         - max-w-lg mx-auto : limite la largeur de la carte et la centre horizontalement
         - shadow-xl : applique une ombre portée élégante
         - rounded-2xl : arrondit fortement les coins du conteneur
      */}
      <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
        
        {/* EN-TÊTE : Titre de l'application + Bouton de changement de thème */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Ma Liste de Tâches <span className="text-blue-600 dark:text-blue-400 font-extrabold">(Redux)</span>
          </h1>
          
          {/* Composant de bascule Dark/Light Mode */}
          <ThemeToggle />
        </div>

        {/* COMPOSANT DE SAISIE : Champ d'ajout de tâche */}
        <AddTask />

        {/* COMPOSANT DE LISTE : Filtres, affichage et actions globales */}
        <ListTask />
      </div>
    </div>
  );
}