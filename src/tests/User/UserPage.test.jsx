import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import UserPage from '../../pages/user/UserPage';
import { AlertContext } from '../../contexts/AlertContext';
import UserService from '../../services/UserService';

jest.mock('../../services/UserService');

const history = createMemoryHistory();
describe('When I create a User Component', () => {
  UserService.List.mockImplementation(jest.fn);

  describe('and the Table rendered', () => {
    beforeEach(async () => {
      UserService.List.mockImplementation(() => Promise.resolve(
        [
          {
            id: '1', name: 'username 1',
          },
          {
            id: '2', name: 'username 2',
          },
          {
            id: '3', name: 'username 3',
          },
        ],
      ));

      const mockAlertState = { handleAlert: jest.fn };
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
      it('should expect Username Column', () => {
        const columnNome = screen.getByText('Nome');
        expect(columnNome).toBeInTheDocument();
      });
    });

    describe('and the Button Labels rendered', () => {
      it('should expect Novo button', () => {
        const novoButton = screen.getByText('Novo');
        expect(novoButton).toBeInTheDocument();
      });
      it('should expect Excluir button', () => {
        const removeButton = screen.getByText('Excluir');
        expect(removeButton).toBeInTheDocument();
      });
      it('should expect Alterar button', () => {
        const alterarButton = screen.getByText('Alterar');
        expect(alterarButton).toBeInTheDocument();
      });
    });

    describe('when click in the Novo Button', () => {
      it('should have route /usuarios/novo', () => {
        const novoButton = screen.getByText('Novo');
        fireEvent.click(novoButton);
        expect(history.location.pathname).toMatch('/usuarios/novo');
      });
    });
    describe('when click in the Remover Button', () => {
      it('should delete the selected user', async () => {
      });
    });
  });
});
