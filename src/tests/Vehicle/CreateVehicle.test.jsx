import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router, waitForElementToBeRemoved } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CreateVehicle from '../../pages/vehicle/create/CreateVehicle';
import { AlertContext } from '../../contexts/AlertContext';

jest.mock('../../services/Vehicleservice');

async function waitUserForm() {
  const loadElement = screen.queryByRole('progressbar');
  if (loadElement) {
    await waitForElementToBeRemoved(loadElement);
  }
}

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

    waitUserForm();
  });
  it('should render have rendered the labels', () => {
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
  });
});
