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
});
