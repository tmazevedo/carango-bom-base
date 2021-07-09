import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import VehiclePage from '../../pages/vehicle/VehiclePage';
import { AlertContext } from '../../contexts/AlertContext';
import VehicleService from '../../services/Vehicleservice';

jest.mock('../../services/Vehicleservice');

describe('When I create a Vehicle Component', () => {
  VehicleService.List.mockImplementation(jest.fn);

  describe('and the Table rendered', () => {
    beforeEach(() => {
      act(() => {
        const mockAlertState = { handleAlert: jest.fn };
        VehicleService.List.mockImplementation(() => Promise.resolve(
          [
            {
              id: '9', brand: { id: 1, name: 'Ford' }, model: 'Ka', year: 2020, value: 40000,
            },
            {
              id: '10', brand: { id: 1, name: 'Ford' }, model: 'Ranger', year: 2021, value: 245000,
            },
            {
              id: '11', brand: { id: 1, name: 'Ford' }, model: 'Ranger', year: 2021, value: 245000,
            },
          ],
        ));

        render(
          <AlertContext.Provider value={mockAlertState}>
            <VehiclePage />
          </AlertContext.Provider>,
          { wrapper: MemoryRouter },
        );
      });
    });

    describe('and the Columns rendered', () => {
      it('should expect Marca Column', () => {
        expect(screen.getByText('Marca')).toBeInTheDocument();
      });
      it('should expect Modelo Column', () => {
        expect(screen.getByText('Modelo')).toBeInTheDocument();
      });
      it('should expect Ano Column', () => {
        expect(screen.getByText('Ano')).toBeInTheDocument();
      });
    });

    it('should have called VehicleService.List', () => {
      expect(VehicleService.List).toHaveBeenCalled();
    });
  });

  describe('and the button Novo', () => {
    it('should expect button to be rendered', () => {
      const mockAlertState = { handleAlert: jest.fn };

      render(
        <AlertContext.Provider value={mockAlertState}>
          <VehiclePage />
        </AlertContext.Provider>,
        { wrapper: MemoryRouter },
      );
      expect(screen.getByText('Novo')).toBeInTheDocument();
    });

    describe('and the button is clicked', () => {
      it('should have route /veiculos/editar/{id}', () => {
        const mockAlertState = { handleAlert: jest.fn };
        const history = createMemoryHistory();

        act(() => {
          render(
            <AlertContext.Provider value={mockAlertState}>
              <Router history={history}>
                <VehiclePage />
              </Router>
            </AlertContext.Provider>,
          );

          fireEvent.click(screen.getByText('Novo'));
        });

        expect(history.location.pathname).toMatch('/veiculos/novo');
      });
    });
  });

  describe('and the button Alterar', () => {
    it('should expect Alterar button', () => {
      const mockAlertState = { handleAlert: jest.fn };

      render(
        <AlertContext.Provider value={mockAlertState}>
          <VehiclePage />
        </AlertContext.Provider>,
        { wrapper: MemoryRouter },
      );
      expect(screen.getByText('Alterar')).toBeInTheDocument();
    });
  });

  describe('and the button Excluir', () => {
    it('should expect Excluir button', () => {
      const mockAlertState = { handleAlert: jest.fn };

      render(
        <AlertContext.Provider value={mockAlertState}>
          <VehiclePage />
        </AlertContext.Provider>,
        { wrapper: MemoryRouter },
      );
      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });
  });
});
