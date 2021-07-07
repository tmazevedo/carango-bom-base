import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import VehiclePage from '../../pages/vehicle/VehiclePage';
import { AlertContext } from '../../contexts/AlertContext';

describe('When I create a Vehicle Component', () => {
  beforeEach(() => {
    const mockAlerState = { handleAlert: jest.fn };
    render(
      <AlertContext.Provider value={mockAlerState}>
        <VehiclePage />
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

  describe('and the Columns Table', () => {
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
});
