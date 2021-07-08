import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Table from '../../components/table/table';
import { vehicleTable } from './constants';

describe('When Create Table Component', () => {
  describe('the Columns Render', () => {
    describe('should render columns from Vehicle Table', () => {
      it('should expect all columns', () => {
        render(<Table columnBuffer={4} fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="" remove={() => { }} />);

        expect(screen.getByText('Marca')).toBeInTheDocument();
        expect(screen.getByText('Modelo')).toBeInTheDocument();
        expect(screen.getByText('Ano')).toBeInTheDocument();
        expect(screen.getByText('Valor')).toBeInTheDocument();
      });
    });
    describe('the Fields Render', () => {
      describe('should render fields from Vehicle Table', () => {
        it('should expect all fields', async () => {
          render(<Table columnBuffer={4} fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="" remove={() => { }} />);

          const items = await screen.findAllByText('Ford');

          expect(items).toHaveLength(2);
        });
      });
    });
    describe('the Alterar button', () => {
      it('should rendered', () => {
        render(<Table fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="" remove={() => { }} />);
        expect(screen.getByText('Alterar')).toBeInTheDocument();
      });
      it('should call alterar callback is clicked', () => {
        const history = createMemoryHistory();
        history.push('/veiculos');

        render(
          <Router history={history}>
            <Table fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="/veiculos/" remove={() => {}} />
          </Router>,
        );

        fireEvent.click(screen.getByText('Ka'));
        fireEvent.click(screen.getByText('Alterar'));

        const ultimoHistory = history.entries[history.entries.length - 1].pathname;

        expect(ultimoHistory).toMatch('/veiculos/9');
      });
    });
    describe('the Delete button', () => {
      it('should be rendered', () => {
        render(<Table fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="" remove={() => { }} />);
        expect(screen.getByText('Excluir')).toBeInTheDocument();
      });

      it('should call remove callback is clicked', () => {
        const mockRemove = jest.fn();

        render(<Table fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="" remove={mockRemove} />);

        fireEvent.click(screen.getByText('Ka'));
        fireEvent.click(screen.getByText('Excluir'));
        fireEvent.click(screen.getByText('Confirmar'));

        expect(mockRemove).toHaveBeenCalledTimes(1);
      });
    });
  });
});
