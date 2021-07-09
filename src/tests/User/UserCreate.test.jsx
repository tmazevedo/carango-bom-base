import React from 'react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import {
  render, screen, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import CreateUser from '../../pages/user/create/CreateUser';
import { AlertContext } from '../../contexts/AlertContext';
import UserService from '../../services/UserService';
import userList from './constants';

function fillFieldsUserCreate(username, password, confirmPassword) {
  const usernameInput = screen.getByLabelText('Usuário *');
  fireEvent.change(usernameInput, { target: { value: username } });

  const passwordInput = screen.getByLabelText('Senha *');
  fireEvent.change(passwordInput, { target: { value: password } });

  const confirmPasswordInput = screen.getByLabelText('Confirmar senha *');
  fireEvent.change(confirmPasswordInput, { target: { value: confirmPassword } });
}

async function saveUser() {
  const saveButton = await screen.findByText('Salvar');
  fireEvent.click(saveButton);
  const loadElement = screen.queryByRole('progressbar');
  if (loadElement) {
    await waitForElementToBeRemoved(loadElement);
  }
}

jest.mock('../../services/UserService');

const mockAlertState = { handleAlert: jest.fn() };
describe('When UserCreate', () => {
  describe('without id (Novo)', () => {
    const history = createMemoryHistory();
    beforeEach(async () => {
      render(
        <AlertContext.Provider value={mockAlertState}>
          <Router history={history}>
            <CreateUser />
          </Router>
        </AlertContext.Provider>,
        { wrapper: MemoryRouter },
      );
      await screen.findByTestId('form-actions');
    });
    describe('and the button Salvar', () => {
      it('should expect to be in the document', () => {
        expect(screen.getByText('Salvar')).toBeInTheDocument();
      });

      describe('fill the fields', () => {
        it('incorrect password', async () => {
          fillFieldsUserCreate('username', '12345', '54321');
          await saveUser();
          expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
            status: 'error',
            message: 'Invalid password',
          });
        });

        it('valid fields', async () => {
          fillFieldsUserCreate('username', '12345', '12345');
          await saveUser();
          expect(UserService.Save).toHaveBeenCalled();
          expect(history.location.pathname).toBe('/usuarios');
          expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
            status: 'success',
            message: 'Incluído com sucesso.',
          });
        });
      });
    });
  });

  describe('with id (Alterar)', () => {
    const user = userList[0];
    const history = createMemoryHistory({ initialEntries: ['/usuarios/editar/1'] });
    beforeEach(async () => {
      UserService.FindById.mockImplementation(() => Promise.resolve(user));
      UserService.UpdateUser.mockResolvedValue({});
      render(
        <AlertContext.Provider value={mockAlertState}>
          <Router history={history}>
            <Route path="/usuarios/editar/:id" component={() => (<CreateUser />)} />
          </Router>
        </AlertContext.Provider>,
      );
      await screen.findByTestId('form-actions');
    });

    describe('when load the page', () => {
      it('should fill the Usuário', () => {
        const usernameText = screen.getByDisplayValue(user.username);
        expect(usernameText).toBeInTheDocument();
      });

      it('update user', async () => {
        fillFieldsUserCreate('usuário alterado', '123456', '123456');
        await saveUser();
        expect(UserService.UpdateUser).toHaveBeenCalled();
        expect(history.location.pathname).toBe('/usuarios');
        expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
          status: 'success',
          message: 'Alterado com sucesso.',
        });
      });
    });
  });
});
