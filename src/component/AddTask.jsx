// 1. IMPORTATIONS
// "useState" permet de gérer la saisie du champ texte localement.
import { useState } from 'react';
// "useDispatch" est le hook Redux permettant d'envoyer des actions au store.
import { useDispatch } from 'react-redux';
// On importe le créateur d'action "addTask" exporté depuis notre Slice.
import { addTask } from '../redux/tasksSlice';

// 2. DÉCLARATION DU COMPOSANT
export function AddTask() {
  // --- ÉTAT LOCAL ---
  // "text" stocke ce que l'utilisateur tape dans l'input avant d'ajouter la tâche.
  const [text, setText] = useState('');
  
  // Initialisation de la fonction de dispatch de Redux.
  const dispatch = useDispatch();

  // --- GESTION DE LA SOUMISSION DU FORMULAIRE ---
  const handleSubmit = (e) => {
    // Empêche le rechargement par défaut de la page lors de la soumission du formulaire.
    e.preventDefault();

    // Vérifie que le champ n'est pas vide (en retirant les espaces inutiles avec trim()).
    if (text.trim() !== '') {
      // Dispatch l'action "addTask" en passant le texte comme payload.
      dispatch(addTask(text));

      // Réinitialise le champ de saisie texte à vide après l'ajout.
      setText('');
    }
  };

  return (
    /* FORMULAIRE D'AJOUT
       onSubmit intercepte l'appui sur "Entrée" ou le clic sur le bouton "Ajouter".
       Les classes Tailwind gèrent l'alignement horizontal (flex, gap-2) et la largeur (max-w-md mx-auto).
    */
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto my-4">
      
      {/* CHAMP DE SAISIE TEXTE */}
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={text} // Composant contrôlé par l'état local "text"
        onChange={(e) => setText(e.target.value)} // Met à jour l'état local à chaque touche tapée
        // Styles Tailwind : adaptatifs clair/sombre (bg-white dark:bg-slate-800) et focus bleu.
        className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />

      {/* BOUTON D'ENVOI */}
      <button 
        type="submit" // type="submit" indique au formulaire de déclencher la méthode handleSubmit lors du clic
        // Styles Tailwind : fond bleu avec effet d'enfoncement (active:scale-95) au clic.
        className="px-5 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Ajouter
      </button>
    </form>
  );
}