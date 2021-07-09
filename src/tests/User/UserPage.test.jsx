import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import UserPage from '../../pages/user/UserPage';
import { AlertContext } from '../../contexts/AlertContext';
import UserService from '../../services/UserService';
import userList from './constants';

jest.mock('../../services/UserService');

const history = createMemoryHistory();
const mockAlertState = { handleAlert: jest.fn() };
describe('When I create a User Component', () => {
  describe('and the Table rendered', () => {
    beforeEach(async () => {
      UserService.List.mockResolvedValue(userList);
      render(
        <AlertContext.Provider value={mockAlertState}>
          <Router history={history}>
            <UserPage />
          </Router>
        </AlertContext.Provider>,
        { wrapper: MemoryRouter },
      );

      await screen.findByRole('grid');
    });

    describe('and the Columns rendered', () => {
      it('should expect Nome Column', () => {
        const columnNome = screen.getByText('Nome');
        expect(columnNome).toBeInTheDocument();
      });
    });

    describe('when the button Novo', () => {
      it('should expect to be in the document', () => {
        const novoButton = screen.getByText('Novo');
        expect(novoButton).toBeInTheDocument();
      });

      describe('and is clicked', () => {
        it('should have route /usuarios/novo', () => {
          fireEvent.click(screen.getByText('Novo'));
          expect(history.location.pathname).toMatch('/usuarios/novo');
        });
      });
    });

    describe('when the button Excluir', () => {
      it('should expect Excluir button', () => {
        const removeButton = screen.getByText('Excluir');
        expect(removeButton).toBeInTheDocument();
      });

      describe('and is clicked', () => {
        describe('and is clicked with an invalid user id', () => {
          beforeEach(async () => {
            const { username } = userList.find((user) => user.id === 'badID');
            fireEvent.click(screen.getByText(username));
            fireEvent.click(screen.getByText('Excluir'));
            await screen.findByText('Confirmar');
            await screen.findByText('Cancelar');
          });
          it('should throw an error', async () => {
            const confirmButton = await screen.findByText('Confirmar');
            fireEvent.click(confirmButton);
            expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
              status: 'error',
              message: 'User ID is not an integer',
            });
          });
        });

        describe('and is clicked with an valid user id', () => {
          beforeEach(async () => {
            const { username } = userList.find((user) => user.id === '1');
            fireEvent.click(screen.getByText(username));
            fireEvent.click(screen.getByText('Excluir'));
            await screen.findByText('Confirmar');
            await screen.findByText('Cancelar');
          });
          it('should remove the user', async () => {
            const confirmButton = await screen.findByText('Confirmar');
            fireEvent.click(confirmButton);
            expect(UserService.Remove).toHaveBeenCalled();
          });

          it('the user should be removed from table', async () => {
            const { username } = userList.find((user) => user.id === '1');
            const usernameLine = screen.getByText(username);
            const confirmButton = await screen.findByText('Confirmar');
            fireEvent.click(confirmButton);
            await screen.findByRole('grid');
            expect(usernameLine).not.toBeInTheDocument();
          });

          describe('and click on cancelar button', () => {
            it('should remove the user', async () => {
              const { username } = userList[0];
              const usernameLine = screen.getByText(username);
              const cancelButton = await screen.findByText('Cancelar');
              fireEvent.click(cancelButton);
              await screen.findByRole('grid');
              expect(usernameLine).toBeInTheDocument();
            });
          });
        });
      });
    });

    describe('when the button Alterar', () => {
      it('should expect Alterar button', () => {
        const alterarButton = screen.getByText('Alterar');
        expect(alterarButton).toBeInTheDocument();
      });

      describe('and is clicked', () => {
        it('should have route /usuarios/editar/{id}', () => {
          const { id, username } = userList[0];
          fireEvent.click(screen.getByText(username));
          fireEvent.click(screen.getByText('Alterar'));
          expect(history.location.pathname).toMatch(`/usuarios/editar/${id}`);
        });
      });
    });
  });
});
