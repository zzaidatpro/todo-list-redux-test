// 1. IMPORTATIONS
// useState pour stocker le thème actif (sombre ou clair)
// useEffect pour appliquer les changements au DOM et sauvegarder la préférence
import { useState, useEffect } from 'react';

// 2. DÉCLARATION DU COMPOSANT
export function ThemeToggle() {
  // --- ÉTAT LOCAL AVEC INITIALISATION PARESSEUSE (LAZY INITIALIZATION) ---
  // On passe une fonction anonyme à useState() pour ne lire le localStorage/Media Query qu'au premier rendu
  const [darkMode, setDarkMode] = useState(() => {
    // 1. Vérifie si l'utilisateur a déjà une préférence enregistrée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';

    // 2. Sinon, détecte la préférence système du navigateur/OS (Dark/Light mode par défaut)
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // --- EFFET DE BORD (SIDE EFFECT) ---
  // S'exécute à chaque fois que la valeur de "darkMode" change
  useEffect(() => {
    const root = document.documentElement; // Récupère la balise HTML racine (<html>)

    if (darkMode) {
      // Ajoute la classe Tailwind 'dark' sur la balise <html>
      root.classList.add('dark');
      // Enregistre le choix dans le stockage local du navigateur
      localStorage.setItem('theme', 'dark');
    } else {
      // Retire la classe 'dark' pour revenir au mode clair
      root.classList.remove('dark');
      // Met à jour la préférence dans le stockage local
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]); // Tableau de dépendances : l'effet se déclenche dès que "darkMode" varie

  return (
    /* BOUTON DE BASCULEMENT DU THÈME */
    <button
      // Inverse le booléen darkMode (true -> false, false -> true) lors du clic
      onClick={() => setDarkMode(!darkMode)}
      // Styles Tailwind adaptatifs avec transition fluide
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      title="Changer de thème"
    >
      {/* Affichage conditionnel de l'icône et du texte selon le thème actif */}
      {darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
    </button>
  );
}