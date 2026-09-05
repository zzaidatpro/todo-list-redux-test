import { test, expect, describe } from 'vitest';
import taskReducer, { 
  addTask, 
  toggleTask, 
  deleteTask, 
  editTask, 
  setFilter 
} from './taskSlice';

describe('Tests du Reducer taskSlice', () => {

  // 1. État par défaut de Redux
  test('doit retourner l état initial par défaut si aucun state n est fourni', () => {
    const nextState = taskReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    expect(nextState).toBeDefined();
    expect(nextState.items).toBeDefined();
    expect(Array.isArray(nextState.items)).toBe(true);
  });

  // 2. Ajout de tâche
  test('doit ajouter une tâche dans le state Redux', () => {
    const initialState = { items: [] };
    const nextState = taskReducer(initialState, addTask('Test'));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].description).toBe('Test');
    expect(nextState.items[0].isDone).toBe(false);
  });

  // 3. Bascule du statut (isDone)
  test('doit basculer l état isDone d une tâche (toggleTask)', () => {
    const stateAvecTache = {
      items: [{ id: 1, description: 'Acheter du pain', isDone: false }]
    };

    const nextState = taskReducer(stateAvecTache, toggleTask(1));
    expect(nextState.items[0].isDone).toBe(true);

    // Test de la bascule inverse (true -> false)
    const stateRetour = taskReducer(nextState, toggleTask(1));
    expect(stateRetour.items[0].isDone).toBe(false);
  });

  // 4. Suppression de tâche
  test('doit supprimer une tâche par son id (deleteTask)', () => {
    const stateInitial = {
      items: [
        { id: 1, description: 'Tâche 1', isDone: false },
        { id: 2, description: 'Tâche 2', isDone: true }
      ]
    };

    const nextState = taskReducer(stateInitial, deleteTask(1));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].id).toBe(2);
  });

  // 5. Modification d'une tâche
  test('doit modifier la description d une tâche existante (editTask)', () => {
    const stateInitial = {
      items: [{ id: 1, description: 'Ancien texte', isDone: false }]
    };

    const nextState = taskReducer(stateInitial, editTask({ id: 1, description: 'Nouveau texte' }));

    expect(nextState.items[0].description).toBe('Nouveau texte');
  });

  // 6. Filtrage des tâches (Optionnel si géré dans le slice)
  test('doit mettre à jour le filtre actif (setFilter)', () => {
    const stateInitial = { items: [], filter: 'all' };

    const nextState = taskReducer(stateInitial, setFilter('done'));

    expect(nextState.filter).toBe('done');
  });

});