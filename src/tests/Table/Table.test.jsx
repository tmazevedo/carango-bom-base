import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../../components/table/table';
import { vehicleTable, userTable, brandTable } from './constants';

describe('When I Create Table Component', () => {
    describe('the Columns Render', () => {
        describe('should render columns from Vehicle Table', () => {
            it('should expect all columns', () => {
                render(<Table fields={vehicleTable.fields} columns={vehicleTable.columns} routeToChange="" remove={() => { }} />);
                expect(screen.getByText('Marca')).toBeInTheDocument();
                expect(screen.getByText('Modelo')).toBeInTheDocument();
                expect(screen.getByText('Ano')).toBeInTheDocument();
            });
        });
        describe('should render columns from User Table', () => {
            it('should expect all columns', () => {
                render(<Table fields={userTable.fields} columns={userTable.columns} routeToChange="" remove={() => { }} />);
                expect(screen.getByText('Nome')).toBeInTheDocument();
            });
        });
        describe('should render columns from Brand Table', () => {
            it('should expect all columns', () => {
                render(<Table fields={brandTable.fields} columns={brandTable.columns} routeToChange="" remove={() => { }} />);
                expect(screen.getByText('Marca')).toBeInTheDocument();
            });
        });
        describe('should render all buttons', () => {
            it('should expect Excluir Button', () => {
                render(<Table fields={brandTable.fields} columns={brandTable.columns} routeToChange="" remove={() => { }} />);
                expect(screen.getByText('Excluir')).toBeInTheDocument();
            });
        });
    });
});
