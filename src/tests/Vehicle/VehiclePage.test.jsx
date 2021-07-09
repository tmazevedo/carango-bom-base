import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import VehiclePage from '../../pages/vehicle/VehiclePage';
import { AlertContext } from '../../contexts/AlertContext';
import VehicleService from '../../services/Vehicleservice';

jest.mock('../../services/Vehicleservice');

const history = createMemoryHistory();

beforeEach(async () => {
  VehicleService.List.mockResolvedValue([
    {
      id: '9', brand: { id: 1, name: 'Ford' }, model: 'Ka', year: 2020, value: 40000,
    },
    {
      id: '10', brand: { id: 1, name: 'Ford' }, model: 'Ranger', year: 2021, value: 245000,
    },
    {
      id: '11', brand: { id: 1, name: 'Ford' }, model: 'Ranger', year: 2021, value: 245000,
    },
  ]);

  const mockAlertState = { handleAlert: jest.fn };
  render(
    <AlertContext.Provider value={mockAlertState}>
      <Router history={history}>
        <VehiclePage />
      </Router>
    </AlertContext.Provider>,
    { wrapper: MemoryRouter },
  );

  await screen.findByRole('grid');
});

describe('When I create a Vehicle Component', () => {
  describe('and the Table rendered', () => {
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
      expect(screen.getByText('Novo')).toBeInTheDocument();
    });

    describe('and the button is clicked', () => {
      it('should have route /veiculos/editar/{id}', () => {
        fireEvent.click(screen.getByText('Novo'));
        expect(history.location.pathname).toMatch('/veiculos/novo');
      });
    });
  });

  describe('and the button Alterar', () => {
    it('should expect Alterar button', () => {
      expect(screen.getByText('Alterar')).toBeInTheDocument();
    });
  });

  describe('and the button Excluir', () => {
    it('should expect Excluir button', () => {
      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });
  });
});
