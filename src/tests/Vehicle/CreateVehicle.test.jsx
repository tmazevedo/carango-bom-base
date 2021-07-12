import React from 'react';
import { createMemoryHistory } from 'history';
import {
  MemoryRouter, Router, Route,
} from 'react-router-dom';
import {
  render, screen, waitForElementToBeRemoved, fireEvent,
} from '@testing-library/react';
import CreateVehicle from '../../pages/vehicle/create/CreateVehicle';
import { AlertContext } from '../../contexts/AlertContext';
import BrandService from '../../services/BrandService';
import VehicleService from '../../services/Vehicleservice';
import vehicleList from './constants';

jest.mock('../../services/Vehicleservice');
jest.mock('../../services/BrandService');
const mockAlertState = { handleAlert: jest.fn() };

function fillFieldsVehicleCreate(brand, model, year, price) {
  const usernameInput = screen.getByLabelText('Modelo *');
  fireEvent.change(usernameInput, { target: { value: model } });

  const passwordInput = screen.getByLabelText('Ano *');
  fireEvent.change(passwordInput, { target: { value: year } });

  const confirmPasswordInput = screen.getByLabelText('Valor *');
  fireEvent.change(confirmPasswordInput, { target: { value: price } });
}

async function saveVehicle() {
  const saveButton = await screen.findByText('Salvar');
  fireEvent.click(saveButton);
  const loadElement = screen.queryByRole('progressbar');
  if (loadElement) {
    await waitForElementToBeRemoved(loadElement);
  }
}

async function waitUserForm() {
  const loadElement = screen.queryByRole('progressbar');
  if (loadElement) {
    await waitForElementToBeRemoved(loadElement);
  }
}

describe('When I create a Vehicle Component without id', () => {
  const history = createMemoryHistory('/veiculos/novo');

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

  describe('when click in voltar button', () => {
    it('should have route /veiculos', () => {
      const voltarButton = screen.getByText('Voltar');
      fireEvent.click(voltarButton);

      expect(history.location.pathname).toBe('/veiculos');
    });
  });

  describe('when click in Salvar Button', () => {
    it('when fill the fields', async () => {
      fillFieldsVehicleCreate('Ford', 'Ka', '2011', '11000');
      await saveVehicle();
      expect(VehicleService.Save).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/veiculos');
      expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
        status: 'success',
        message: 'Criado com sucesso.',
      });
    });
  });
});

describe('When I create a Vehicle Component with id', () => {
  const vehicle = vehicleList[0];
  const history = createMemoryHistory({ initialEntries: ['/veiculos/editar/9'] });

  beforeEach(async () => {
    VehicleService.FindById.mockImplementation(() => Promise.resolve(vehicle));
    VehicleService.UpdateVehicle.mockResolvedValue({});
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
    render(
      <AlertContext.Provider value={mockAlertState}>
        <Router history={history}>
          <Route path="/veiculos/editar/:id" component={() => (<CreateVehicle />)} />
        </Router>
      </AlertContext.Provider>,
    );
    await screen.findByTestId('form-actions');
  });

  it('when fill the fields', async () => {
    fillFieldsVehicleCreate('Ford novo', 'Ka update', '2012', '12000');
    await saveVehicle();
    expect(VehicleService.UpdateVehicle).toHaveBeenCalled();
    expect(mockAlertState.handleAlert).toHaveBeenCalledWith({
      status: 'success',
      message: 'Alterado com sucesso.',
    });
    expect(history.location.pathname).toBe('/veiculos');
  });
});
