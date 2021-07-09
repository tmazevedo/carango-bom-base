import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import DashboardService from '../../services/DashboardService';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import dashboardList from './constants';

jest.mock('../../services/DashboardService');

describe('When I create a Dashboard Component', () => {
  beforeEach(async () => {
    DashboardService.List.mockResolvedValue(dashboardList);
    render(
      <DashboardPage />,
      { wrapper: MemoryRouter },
    );
    await screen.findByText('veículos encontrados');
  });

  describe('and the cards render', () => {
    it('should render the count of cars', () => {
      let total = 0;
      dashboardList.forEach((element) => { total += element.count; });
      const countRendered = screen.getByText((content, node) => {
        if (content !== 'veículos encontrados') return false;
        const children = Array.from(node.children);
        return children.some((child) => child.textContent === String(total));
      });
      expect(countRendered).toBeInTheDocument();
    });
  });
});
