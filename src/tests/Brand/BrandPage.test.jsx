import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BrandPage from '../../pages/brand/BrandPage';
import { AlertContext } from '../../contexts/AlertContext';
import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

const history = createMemoryHistory();

beforeEach(async () => {
  BrandService.List.mockImplementation(() => Promise.resolve(
    [
      {
        id: '1', name: 'Ford',
      },
      {
        id: '2', name: 'Audi',
      },
      {
        id: '2', name: 'BMW',
      },
    ],
  ));

  const mockAlertState = { handleAlert: jest.fn };
  render(
    <AlertContext.Provider value={mockAlertState}>
      <Router history={history}>
        <BrandPage />
      </Router>
    </AlertContext.Provider>,
    { wrapper: MemoryRouter },
  );

  await screen.findByRole('grid');
});

describe('When I create a Brand Component', () => {
  describe('and the button renders', () => {
    it('should expect Novo button', async () => {
      const novoButton = screen.getByText('Novo');
      expect(novoButton).toBeInTheDocument();
    });

    describe('and the loading finishes', () => {
      it('should expect Alterar button', () => {
        const alterarButton = screen.getByText('Alterar');
        expect(alterarButton).toBeInTheDocument();
      });

      it('should expect Excluir button', () => {
        const excluirButton = screen.getByText('Excluir');
        expect(excluirButton).toBeInTheDocument();
      });
    });

    describe('and I click on Novo button', () => {
      it('should have route /brands/novo/', () => {
        fireEvent.click(screen.getByText('Novo'));
        expect(history.location.pathname).toMatch('/marcas/novo');
      });
    });
  });

  it('should call the brands list call', () => {
    expect(BrandService.List).toHaveBeenCalled();
  });
});
