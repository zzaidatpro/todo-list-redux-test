import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";

// 1. Charger l'état sauvegardé depuis le localStorage au démarrage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Erreur de chargement du localStorage:", err);
    return undefined;
  }
};

// 2. Initialiser le store avec l'état persistant si présent
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: loadState(),
});

// 3. Sauvegarder automatiquement le state dans le localStorage à chaque modification
store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Erreur de sauvegarde dans le localStorage:", err);
  }
});