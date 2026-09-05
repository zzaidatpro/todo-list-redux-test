// 1. IMPORTATION
// On importe "createSlice" de Redux Toolkit.
// Cette fonction simplifie la création des reducers et génère automatiquement les actions correspondantes.
import { createSlice } from '@reduxjs/toolkit';

// 2. CRÉATION DU SLICE
// Un "slice" (tranche) regroupe le nom du module, son état initial et ses fonctions de modification (reducers).
const tasksSlice = createSlice({
  name: 'tasks', // Nom unique identifiant cette tranche dans le store Redux.

  // --- ÉTAT INITIAL (initialState) ---
  // Définit les données au démarrage de l'application.
  initialState: {
    items: [ // Tableau contenant la liste de départ des tâches.
      { id: 1, description: 'React-Redux', isDone: false },
      { id: 2, description: 'Redux-Hooks', isDone: false },
      { id: 3, description: 'Redux-Toolkit', isDone: false },
      { id: 4, description: 'Redux-Saga', isDone: false },
      { id: 5, description: 'Redux-Thunk', isDone: false },
      { id: 6, description: 'Redux-Flux', isDone: false },
      { id: 7, description: 'Redux-Mobx', isDone: false },
    ],
    filter: 'ALL', // Filtre d'affichage actif ('ALL', 'DONE', ou 'NOT_DONE').
  },

  // --- LES RÉDUCTEURS (reducers) ---
  // Fonctions qui définissent COMMENT l'état change en réponse aux actions déclenchées.
  // Grâce à la librairie Immer intégrée à Redux Toolkit, on peut modifier ("muter") directement le "state".
  reducers: {

    // A. AJOUTER UNE TÂCHE
    // Réçoit le texte de la tâche dans "action.payload" et l'ajoute au tableau "items".
    addTask: (state, action) => {
      state.items.push({
        id: Date.now(), // Génère un identifiant unique basé sur le temps exact.
        description: action.payload, // Récupère la chaîne de texte transmise par le composant.
        isDone: false, // Une nouvelle tâche est toujours non terminée par défaut.
      });
    },

    // B. SUPPRIMER UNE TÂCHE SPÉCIFIQUE
    // Réçoit l'ID de la tâche dans "action.payload" et conserve uniquement les tâches ayant un ID différent.
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    // C. SUPPRIMER TOUTES LES TÂCHES
    // Réinitialise le tableau des tâches à un tableau vide.
    deleteAllTasks: (state) => {
      state.items = [];
    },

    // D. SUPPRIMER LES TÂCHES TERMINÉES
    // Garde uniquement les tâches dont "isDone" vaut false (non faites).
    deleteAllDoneTasks: (state) => {
      state.items = state.items.filter((t) => !t.isDone);
    },

    // E. BASCULER L'ÉTAT D'UNE TÂCHE (Fait / Non fait)
    // Cherche la tâche correspondant à l'ID reçu ("action.payload") et inverse son statut "isDone".
    toggleTask: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.isDone = !task.isDone; // Si isDone était false, il devient true (et inversement).
      }
    },

    // F. MODIFIER LE TEXTE D'UNE TÂCHE
    // Réçoit un objet { id, description } dans "action.payload", cherche la tâche et met à jour son texte.
    editTask: (state, action) => {
      const { id, description } = action.payload; // Déstructure les 2 propriétés transmises.
      const task = state.items.find((t) => t.id === id);
      if (task) {
        task.description = description; // Applique la nouvelle description.
      }
    },

    // G. CHANGER LE FILTRE D'AFFICHAGE
    // Reçoit la nouvelle valeur de filtre ('ALL', 'DONE' ou 'NOT_DONE') dans "action.payload".
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// 3. EXPORTATION DES ACTIONS
// Redux Toolkit crée automatiquement des créateurs d'actions portant le même nom que les reducers.
// On les exporte pour pouvoir les utiliser dans les composants avec "dispatch(...)".
export const { 
  addTask, 
  deleteTask, 
  deleteAllTasks, 
  deleteAllDoneTasks, 
  toggleTask, 
  editTask, 
  setFilter 
} = tasksSlice.actions;

// 4. EXPORTATION DU REDUCER
// On exporte par défaut le reducer généré, qui sera importé et combiné dans le fichier "store.js".
export default tasksSlice.reducer;