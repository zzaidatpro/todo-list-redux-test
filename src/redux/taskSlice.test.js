import tasksReducer, {
  addTask,
  deleteTask,
  deleteAllTasks,
  deleteAllDoneTasks,
  toggleTask,
  editTask,
  setFilter,
} from './tasksSlice';

describe('tasksSlice - Tests TDD du Reducer Redux', () => {
  
  const initialState = {
    items: [
      { id: 1, description: 'React-Redux', isDone: false },
      { id: 2, description: 'Redux-Hooks', isDone: false },
      { id: 3, description: 'Redux-Toolkit', isDone: false },
      { id: 4, description: 'Redux-Saga', isDone: false },
      { id: 5, description: 'Redux-Thunk', isDone: false },
      { id: 6, description: 'Redux-Flux', isDone: false },
      { id: 7, description: 'Redux-Mobx', isDone: false },
    ],
    filter: 'ALL',
  };
                                                            });
