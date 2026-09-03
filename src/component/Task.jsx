// 1. IMPORTATIONS
// React Hooks pour gérer l'état local du mode édition
import { useState } from 'react';
// Hook Redux pour envoyer des actions au store
import { useDispatch } from 'react-redux';
// Importation des créateurs d'actions depuis le slice des tâches
import { toggleTask, editTask, deleteTask } from '../redux/tasksSlice';

// 2. DÉCLARATION DU COMPOSANT
// Recevant l'objet "task" en prop ({ id, description, isDone })
export function Task({ task }) {
  // Récupération de la fonction dispatch de Redux
  const dispatch = useDispatch();

  // --- ÉTATS LOCAUX ---
  // "isEditing" : indique si la tâche est actuellement en cours de modification (true/false)
  const [isEditing, setIsEditing] = useState(false);
  // "newText" : conserve le texte modifié temporairement avant la sauvegarde
  const [newText, setNewText] = useState(task.description);

  // --- FONCTIONS DE GESTION (HANDLERS) ---
  
  // Sauvegarde la modification dans le store Redux
  const handleSave = () => {
    if (newText.trim() !== '') {
      // Dispatch l'action editTask avec un objet contenant l'id et le nouveau texte
      dispatch(editTask({ id: task.id, description: newText }));
      setIsEditing(false); // Quitte le mode édition
    }
  };

  // Annule l'édition et réinitialise le champ avec l'ancienne description
  const handleCancel = () => {
    setNewText(task.description);
    setIsEditing(false);
  };

  return (
    /* CONTENEUR PRINCIPAL DE LA TÂCHE
       Les classes Tailwind adaptent le fond, la bordure et l'opacité selon que la tâche est faite ou non,
       tout en prenant en compte le Dark Mode (dark:bg-slate-800).
    */
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
      task.isDone 
        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xs hover:border-slate-300 dark:hover:border-slate-600'
    }`}>
      
      {/* SECTION GAUCHE : Case à cocher + Texte ou Champ de saisie */}
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
        {/* Case à cocher pour changer le statut isDone */}
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => dispatch(toggleTask(task.id))} // Envoie l'ID pour inverser isDone
          className="w-4 h-4 text-blue-600 dark:text-blue-500 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-blue-500 cursor-pointer"
        />

        {/* CONDITIONNEL : Mode Édition vs Mode Lecture */}
        {isEditing ? (
          /* Champ de texte pour modifier la tâche */
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            autoFocus // Met automatiquement le focus sur l'input à l'ouverture
            className="flex-1 px-2 py-1 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-blue-400 dark:border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          /* Affichage du texte de la tâche (barré si task.isDone est vrai) */
          <span className={`text-sm truncate select-none ${
            task.isDone 
              ? 'line-through text-slate-400 dark:text-slate-500' 
              : 'text-slate-800 dark:text-slate-200 font-medium'
          }`}>
            {task.description}
          </span>
        )}
      </div>

      {/* SECTION DROITE : Boutons d'action */}
      <div className="flex items-center gap-1.5 shrink-0">
        {isEditing ? (
          /* BOUTONS EN MODE ÉDITION */
          <>
            <button 
              onClick={handleSave}
              className="px-2.5 py-1 text-xs font-medium text-white bg-green-600 dark:bg-green-500 rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors cursor-pointer"
            >
              Enregistrer
            </button>
            <button 
              onClick={() => dispatch(deleteTask(task.id))}
              className="px-2.5 py-1 text-xs font-medium text-white bg-rose-600 dark:bg-rose-500 rounded hover:bg-rose-700 dark:hover:bg-rose-600 transition-colors cursor-pointer"
            >
              Supprimer
            </button>
            <button 
              onClick={handleCancel}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </>
        ) : (
          /* BOUTONS EN MODE LECTURE */
          <>
            <button 
              onClick={() => setIsEditing(true)} // Bascule en mode édition
              className="px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
            >
              Modifier
            </button>
            <button 
              onClick={() => dispatch(deleteTask(task.id))} // Supprime la tâche
              className="px-2.5 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 rounded hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer"
            >
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
}