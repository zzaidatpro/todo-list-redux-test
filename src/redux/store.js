// 1. IMPORTATION DE CONFIGURESTORE
// "configureStore" est la méthode recommandée par Redux Toolkit pour créer le Store global.
// Elle configure automatiquement les DevTools Redux et ajoute les middlewares essentiels (comme Thunk).
import { configureStore } from "@reduxjs/toolkit";

// 2. IMPORTATION DU REDUCER
// On importe le reducer généré par notre slice "tasksSlice.js".
import tasksReducer from "./tasksSlice";

// 3. CRÉATION ET EXPORTATION DU STORE
// Le store regroupe l'ensemble des états de votre application React.
export const store = configureStore({
  // L'objet "reducer" associe chaque tranche d'état (slice) à une clé dans le state global.
  reducer: {
    tasks: tasksReducer, 
    // 👉 Ainsi, dans vos composants, vous accédez aux tâches via :
    // state.tasks.items et state.tasks.filter
  },
});

// 4. ABONNEMENT AUX CHANGEMENTS D'ÉTAT (store.subscribe)
// La méthode "subscribe" s'exécute automatiquement à CHAQUE FOIS qu'une action est distribuée (dispatch)
// et que l'état du store est modifié.
store.subscribe(() => {
  // "store.getState()" renvoie l'arbre d'état global actuel.
  // Utile pour le débogage : affiche l'état dans la console à chaque changement.
  console.log("Nouvel état du store :", store.getState());
});

// 5. CORRECTION : DISPATCH D'UNE ACTION
// ⚠️ Attention : "store.dispatch()" attend une ACTION (un objet { type, payload }) ou une fonction Thunk.
// Transmettre une fonction anonyme classique comme ci-dessous déclenche une erreur ou un comportement inattendu.
/* 
// INRECT :
store.dispatch(() => {
  console.log(store.getState());
}); 
*/

// ✅ MANIÈRE CORRECTE :
// Pour vérifier l'état sans passer par une action, utilisez simplement console.log() direct :
console.log("État initial au démarrage :", store.getState());