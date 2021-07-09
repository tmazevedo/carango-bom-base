import React from 'react';
import { createMemoryHistory } from 'history';

import { Router } from 'react-router-dom';
import {
  render, screen,
} from '@testing-library/react';
import Sidebar from '../../../components/sidebar/Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';

describe('When I load the sidebar', () => {
  describe('when user is authenticated', () => {
    it('should have the labels', () => {
      const history = createMemoryHistory();
      const mockAlertState = { authenticated: true, handleLogout: jest.fn() };

      render(
        <AuthContext.Provider value={mockAlertState}>
          <Router history={history}>
            <Sidebar> </Sidebar>
          </Router>

        </AuthContext.Provider>
        ,
      );

      expect(screen.getAllByText('Veículos')[1]).toBeVisible();
      expect(screen.getAllByText('Marcas')[0]).toBeVisible();
      expect(screen.getAllByText('Usuários')[0]).toBeVisible();
      expect(screen.getAllByText('Dashboard')[0]).toBeVisible();
      expect(screen.getAllByText('Sair')[0]).toBeVisible();
    });
  });

  describe('when user is not authenticated', () => {
    it('should have the labels', () => {
      const history = createMemoryHistory();
      const mockAlertState = { authenticated: false, handleLogout: jest.fn() };

      render(
        <AuthContext.Provider value={mockAlertState}>
          <Router history={history}>
            <Sidebar> </Sidebar>
          </Router>

        </AuthContext.Provider>
        ,
      );

      expect(screen.getAllByText('Veículos')[0]).toBeVisible();
      expect(screen.getAllByText('Entrar')[0]).toBeVisible();
    });
  });
});
