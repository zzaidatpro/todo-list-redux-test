// 1. IMPORTATIONS
// Hooks Redux pour lire le state (useSelector) et envoyer des actions (useDispatch)
import { useSelector, useDispatch } from 'react-redux';
// Import du composant enfant qui affiche chaque tâche individuelle
import { Task } from './Task';
// Import des actions nécessaires depuis le slice
import { 
  setFilter, 
  deleteAllTasks, 
  deleteAllDoneTasks 
} from '../redux/tasksSlice';

// 2. DÉCLARATION DU COMPOSANT
export function ListTask() {
  // Initialisation de la fonction de dispatch Redux
  const dispatch = useDispatch();

  // --- LECTURE DU STORE REDUX ---
  // Extraction des données "items" (tableau de tâches) et "filter" (filtre actif) depuis state.tasks
  const { items, filter } = useSelector((state) => state.tasks);

  // --- FILTRAGE DES TÂCHES ---
  // On filtre le tableau selon la valeur de "filter" dans Redux
  const filteredTasks = items.filter((task) => {
    if (filter === 'DONE') return task.isDone;        // Conserve uniquement les tâches faites
    if (filter === 'NOT_DONE') return !task.isDone;   // Conserve uniquement les tâches en cours
    return true;                                      // 'ALL' : conserve toutes les tâches
  });

  // --- FONCTION UTILITAIRE DE STYLE POUR LES BOUTONS DE FILTRE ---
  // Retourne dynamiquement les classes Tailwind en fonction du filtre sélectionné et du Dark Mode
  const getFilterBtnClass = (currentFilter) => {
    const isActive = filter === currentFilter;
    return `px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
      isActive
        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-xs'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`;
  };

  return (
    <div className="mt-4">
      {/* SECTION 1 : BARRE DE FILTRES */}
      <div className="flex justify-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => dispatch(setFilter('ALL'))}
          className={getFilterBtnClass('ALL')}
        >
          Toutes
        </button>
        <button 
          onClick={() => dispatch(setFilter('DONE'))}
          className={getFilterBtnClass('DONE')}
        >
          Terminées
        </button>
        <button 
          onClick={() => dispatch(setFilter('NOT_DONE'))}
          className={getFilterBtnClass('NOT_DONE')}
        >
          En cours
        </button>
      </div>

      {/* SECTION 2 : LISTE DES TÂCHES FILTRÉES */}
      <div className="space-y-2 min-h-[80px]">
        {/* Rendu conditionnel : si au moins une tâche correspond au filtre */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            // On passe chaque tâche au composant enfant Task avec une clé unique (id)
            <Task key={task.id} task={task} />
          ))
        ) : (
          // Message d'erreur/d'absence de tâche si la liste est vide
          <p className="text-center text-slate-400 dark:text-slate-500 py-6 italic text-sm">
            Aucune tâche trouvée !
          </p>
        )}
      </div>

      {/* SECTION 3 : BOUTONS D'ACTION GLOBALE */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 justify-end">
        {/* Bouton pour supprimer uniquement les tâches terminées */}
        <button 
          type="button"
          onClick={() => dispatch(deleteAllDoneTasks())}
          className="px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer active:scale-95"
        >
          Supprimer les tâches terminées
        </button>

        {/* Bouton pour vider entièrement la liste */}
        <button 
          type="button"
          onClick={() => dispatch(deleteAllTasks())}
          className="px-3 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer active:scale-95"
        >
          Tout supprimer
        </button>
      </div>
    </div>
  );
}