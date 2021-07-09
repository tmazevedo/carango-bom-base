import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CreateVehicle from '../../pages/vehicle/create/CreateVehicle';
import { AlertContext } from '../../contexts/AlertContext';

jest.mock('../../services/Vehicleservice');

describe('When I create a Vehicle Component without id', () => {
  const history = createMemoryHistory('/veiculos/novo');
  beforeEach(async () => {
    const mockAlertState = { handleAlert: jest.fn() };
    render(
      <AlertContext.Provider value={mockAlertState}>
        <Router history={history}>
          <CreateVehicle />
        </Router>
      </AlertContext.Provider>,
      { wrapper: MemoryRouter },
    );
  });
  it('should render have rendered the labels', () => {
    expect(screen.findByText('Voltar')).toBeInTheDocument();
    expect(screen.findByText('Salvar')).toBeInTheDocument();
    expect(screen.findByText('Marca')).toBeInTheDocument();
  });
});
