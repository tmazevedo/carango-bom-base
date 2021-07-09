import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateBrand from '../../pages/brand/create/CreateBrand';
import { AlertContext } from '../../contexts/AlertContext';
import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

describe('When I create a Brand Component without id', () => {
  const history = createMemoryHistory('/marcas/novo');
  beforeEach(async () => {
    const mockAlertState = { handleAlert: jest.fn };
    render(
      <AlertContext.Provider value={mockAlertState}>
        <Router history={history}>
          <CreateBrand />
        </Router>
      </AlertContext.Provider>,
      { wrapper: MemoryRouter },
    );

    await screen.findByTestId('form-actions');
  });
  it('shoudl render have rendered the labels', () => {
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
  });

  it('when click on Voltar button', () => {
    fireEvent.click(screen.getByText('Voltar'));
    expect(history.location.pathname).toMatch('/marcas');
  });

  it('when click on Salvar button', () => {
    history.push('/marcas');
    history.push('/marcas/novo');
    fireEvent.click(screen.getByText('Salvar'));
    expect(history.location.pathname).toMatch('/marcas');
    expect(BrandService.Save).toHaveBeenCalled();
  });
});

describe('when load the create brand page with id', () => {
  const history = createMemoryHistory({ initialEntries: ['/marcas/editar/1'] });
  beforeEach(async () => {
    const mockAlertState = { handleAlert: jest.fn };
    BrandService.FindById.mockImplementation(() => Promise.resolve(
      { id: 1, name: 'Ford' },
    ));
    render(
      <Router history={history}>
        <Route
          path="/marcas/editar/:id"
          component={() => (
            <AlertContext.Provider value={mockAlertState}>
              <CreateBrand />
            </AlertContext.Provider>
          )}
        />
      </Router>,
    );

    await screen.findByTestId('form-actions');
  });

  it('when render the brand edit', () => {
    expect(BrandService.FindById).toHaveBeenCalled();
  });
  it('when update the brand edited', async () => {
    fireEvent.click(await screen.findByText('Salvar'));
    expect(history.location.pathname).toMatch('/marcas');
    expect(BrandService.UpdateBrand).toHaveBeenCalled();
  });
});
