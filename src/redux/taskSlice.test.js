import taskReducer, { addTask, toggleTask } from './taskSlice';

test('doit ajouter une tâche dans le state Redux', () => {
  const initialState = [];
  const nextState = taskReducer(initialState, addTask({ id: 1, description: 'Test', isDone: false }));
  
  expect(nextState).toHaveLength(1);
  expect(nextState[0].description).toBe('Test');
});