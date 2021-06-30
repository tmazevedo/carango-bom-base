import React from 'react';
import { render, screen } from '@testing-library/react';
import Page404 from '../../pages/page404/Page404';

describe('When Create 404 Page Component', () => {
    it('should render Page not found', () => {
        render(<Page404 />);
        expect(screen.getAllByText('Página não encontrada'));
    });

    it('should render Exclamation Component', () => {
        render(<Page404 />);
        expect(screen.getByTestId('erro-icon')).toBeInTheDocument();
    });
});
