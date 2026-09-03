import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import App from '../../App';

test('l utilisateur ajoute une tâche et elle s affiche dans la liste', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /ajouter/i });

  fireEvent.change(input, { target: { value: 'Nouvelle Tâche Redux' } });
  fireEvent.click(button);

  expect(screen.getByText('Nouvelle Tâche Redux')).toBeInTheDocument();
});