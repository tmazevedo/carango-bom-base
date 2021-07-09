import React from 'react';
import {
  screen, render, fireEvent,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import LoginService from '../../services/LoginService';
import LoginPage from '../../pages/login/LoginPage';

jest.mock('../../services/LoginService');

function makeLogin(user, password) {
  const loginInput = screen.getByLabelText('Usuário *');
  fireEvent.input(loginInput, { target: { value: user } });

  const passwordInput = screen.getByLabelText('Senha *');
  fireEvent.input(passwordInput, { target: { value: password } });

  const loginButton = screen.getByText('Login');

  fireEvent.click(loginButton);
}

describe('When I try to log in', () => {
  describe('and the credentials are right', () => {
    it('should redirect to the home page', async () => {
      LoginService.auth.mockResolvedValue({
        token: 'random-token-test',
        type: 'Bearer',
      });
      const mockAlertState = { handleAlert: jest.fn() };
      const history = createMemoryHistory();
      history.push('/login');
      render(
        <AlertContext.Provider value={mockAlertState}>
          <Router history={history}>
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          </Router>
        </AlertContext.Provider>,
      );
      const flushPromises = () => new Promise(setImmediate);
      makeLogin('admin', 'admin');
      await flushPromises();
      expect(LoginService.auth).toHaveBeenCalled();
      expect(history.location.pathname).toMatch('/dashboard');
    });
  });

  describe('and the credentials are wrong', () => {
    it('should show an error messagee', async () => {
      LoginService.auth.mockResolvedValue({
        token: 'random-token-test',
        type: 'Bearer',
      });
      const mockAlertState = { handleAlert: jest.fn() };
      const history = createMemoryHistory();
      history.push('/login');
      render(
        <AlertContext.Provider value={mockAlertState}>
          <Router history={history}>
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          </Router>
        </AlertContext.Provider>,
      );
      const flushPromises = () => new Promise(setImmediate);
      makeLogin('admin', 'ad');
      await flushPromises();
      expect(LoginService.auth).toHaveBeenCalled();
      expect(screen.findByText('Usuário ou senha inválida!'));
    });
  });
});
