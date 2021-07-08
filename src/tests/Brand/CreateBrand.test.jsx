import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateBrand from '../../pages/brand/create/CreateBrand';
import { AlertContext } from '../../contexts/AlertContext';
import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

describe('when load the create brand page', () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    const mockAlertState = { handleAlert: jest.fn };
    render(
      <AlertContext.Provider value={mockAlertState}>
        <Router history={history}>
          <CreateBrand />
        </Router>
      </AlertContext.Provider>,
      { wrapper: MemoryRouter },
    );
  });
  it('check the labels', () => {
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
