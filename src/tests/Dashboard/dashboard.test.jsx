import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import DashboardService from '../../services/DashboardService';
import DashboardPage from '../../pages/dashboard/DashboardPage';

jest.mock('../../services/DashboardService');

describe('When I create a Dashboard Component', () => {
    beforeEach(async () => {
        DashboardService.List.mockImplementation(() =>
            [
                {
                    "brand": "Fiat",
                    "totalPrice": 1231295358.00,
                    "count": 6
                },
            ],
        );
        render(
            <DashboardPage />,
            { wrapper: MemoryRouter },
        );
    });
    describe('and the cards render', () => {
        it('should expect count of cars', () => {
            expect(screen.findByText('veículos encontrados'));
        });
        it('should expect Brand Name', () => {
            expect(screen.findByText('Fiat'));
        });
    });
})