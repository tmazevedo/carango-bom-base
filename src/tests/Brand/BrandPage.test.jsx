import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BrandPage from '../../pages/brand/BrandPage';
import { AlertContext } from '../../contexts/AlertContext';
import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

describe('When I create a Brand Component', () => {
  beforeEach(() => {
    const mockAlertState = { handleAlert: jest.fn };
    render(
      <AlertContext.Provider value={mockAlertState}>
        <BrandPage />
      </AlertContext.Provider>,
      { wrapper: MemoryRouter },
    );
  });

  describe('and the button renders', () => {
    it('should expect Novo button', () => {
      expect(screen.getByText('Novo')).toBeInTheDocument();
    });
    it('should expect Alterar button', () => {
      expect(screen.getByText('Alterar')).toBeInTheDocument();
    });
    it('should expect Excluir button', () => {
      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });
  });
});

describe('when load the page', () => {
  beforeEach(() => {
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
        <BrandPage />
      </AlertContext.Provider>,
      { wrapper: MemoryRouter },
    );
  });

  it('should call the brands list call', () => {
    expect(BrandService.List).toHaveBeenCalled();
  });
});

describe('Click on Novo button', () => {
  it('should have route /brands/novo/', () => {
    const mockAlertState = { handleAlert: jest.fn };
    const history = createMemoryHistory();

    render(
      <AlertContext.Provider value={mockAlertState}>
        <Router history={history}>
          <BrandPage />
        </Router>
      </AlertContext.Provider>,
    );

    fireEvent.click(screen.getByText('Novo'));

    expect(history.location.pathname).toMatch('/marcas/novo');
  });
});
