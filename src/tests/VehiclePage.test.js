import React from 'react';
import { render, screen } from '@testing-library/react';
import VehiclePage from '../pages/vehicle/VehiclePage';

describe('Create Vehicle Component', () => {
  it('New Button Render', () => {
    render(<VehiclePage />);
    expect(screen.getByText('Novo')).toBeInTheDocument;
  });
  it('Delete Button Render', () => {
    render(<VehiclePage />);
    expect(screen.getByText('Excluir')).toBeInTheDocument;
  });
  it('Brand column Render', () => {
    render(<VehiclePage />);
    expect(screen.getByText('Marca')).toBeInTheDocument;
  });
  it('Model column Render', () => {
    render(<VehiclePage />);
    expect(screen.getByText('Modelo')).toBeInTheDocument;
  });
  it('Year column Render', () => {
    render(<VehiclePage />);
    expect(screen.getByText('Ano')).toBeInTheDocument;
  });
});

// TODO Test a remove Method when is implemmented
