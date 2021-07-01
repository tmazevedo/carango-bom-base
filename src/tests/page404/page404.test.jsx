import React from 'react';
import { render, screen } from '@testing-library/react';
import Page404 from '../../pages/page404/Page404';

describe('When Create 404 Page Component', () => {
    it('should render Page not found', () => {
        render(<Page404 />);
        const element = screen.getByText('Página não encontrada');
        expect(element).toBeInTheDocument();
    });

    it('should render Exclamation Component', () => {
        render(<Page404 />);
        const element = screen.getByTestId('erro-icon');
        expect(element).toBeInTheDocument();
    });
});
