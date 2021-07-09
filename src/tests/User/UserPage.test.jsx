import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import UserPage from '../../pages/user/UserPage';
import { AlertContext } from '../../contexts/AlertContext';
import UserService from '../../services/UserService';

jest.mock('../../services/UserService');

describe('When I create a User Component', () => {
  UserService.List.mockImplementation(jest.fn);

  describe('and the Table rendered', () => {
    beforeEach(() => {
      act(() => {
        const mockAlerState = { handleAlert: jest.fn };
        UserService.List.mockImplementation(() => Promise.resolve(
          [
            {
              id: '1', username: 'username 1',
            },
            {
              id: '2', name: 'username 2',
            },
            {
              id: '3', name: 'username 3',
            },
          ],
        ));

        render(
          <AlertContext.Provider value={mockAlerState}>
            <UserPage />
          </AlertContext.Provider>,
          { wrapper: MemoryRouter },
        );
      });
    });

    describe('and the Columns rendered', () => {
      it('should expect Username Column', () => {
        expect(screen.getByText('Nome')).toBeInTheDocument();
      });
    });

    describe('and the Button Labels rendered', () => {
      it('should expect Novo button', () => {
        expect(screen.getByText('Novo')).toBeInTheDocument();
      });
      it('should expect Excluir button', () => {
        expect(screen.getByText('Excluir')).toBeInTheDocument();
      });
      it('should expect Alterar button', () => {
        expect(screen.getByText('Alterar')).toBeInTheDocument();
      });
    });
  });

  describe('when click in the Novo Button', () => {
    it('should have route /usuarios/novo', () => {
      const mockAlerState = { handleAlert: jest.fn };
      const history = createMemoryHistory();

      act(() => {
        render(
          <AlertContext.Provider value={mockAlerState}>
            <Router history={history}>
              <UserPage />
            </Router>
          </AlertContext.Provider>,
        );

        fireEvent.click(screen.getByText('Novo'));
      });

      expect(history.location.pathname).toMatch('/usuarios/novo');
    });
  });

  // describe('when click in the Remover Button', () => {
  //   it('should delete the selected user', async () => {
  //     const mockAlerState = { handleAlert: jest.fn };

  //     act(async () => {
  //       render(
  //         <AlertContext.Provider value={mockAlerState}>
  //           <Router>
  //             <UserPage />
  //           </Router>
  //         </AlertContext.Provider>,
  //       );

  //       const userRow = await screen.getByText('usuario 1');
  //       fireEvent.click(userRow);
  //       const removeButton = await screen.getByText('Excluir');
  //       fireEvent.click(removeButton);
  //     });

  //     const wrapper = shallow(<UserPage />);
  //     expect(wrapper.text().includes('usuario 2')).toBe(true);

  //     // expect(await screen.getByRole('div', { name: 'usuario 2' })).toBeInTheDocument();
  //   });
  // });
});
