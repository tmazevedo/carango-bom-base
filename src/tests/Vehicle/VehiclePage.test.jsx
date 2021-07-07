import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import VehiclePage from '../../pages/vehicle/VehiclePage';

describe('When I create a Vehicle Component', () => {
  describe('and the button renders', () => {
    it('should expect Novo button', () => {
      render(<VehiclePage />, { wrapper: MemoryRouter });
      expect(screen.getByText('Novo')).toBeInTheDocument();
    });
    it('should expect Alterar button', () => {
      render(<VehiclePage />, { wrapper: MemoryRouter });
      expect(screen.getByText('Alterar')).toBeInTheDocument();
    });
    it('should expect Excluir button', () => {
      render(<VehiclePage />, { wrapper: MemoryRouter });
      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });
  });
  describe('and the Columns Table', () => {
    it('should expect Marca Column', () => {
      render(<VehiclePage />, { wrapper: MemoryRouter });
      expect(screen.getByText('Marca')).toBeInTheDocument();
    });
    it('should expect Modelo Column', () => {
      render(<VehiclePage />, { wrapper: MemoryRouter });
      expect(screen.getByText('Modelo')).toBeInTheDocument();
    });
    it('should expect Ano Column', () => {
      render(<VehiclePage />, { wrapper: MemoryRouter });
      expect(screen.getByText('Ano')).toBeInTheDocument();
    });
  });
});
