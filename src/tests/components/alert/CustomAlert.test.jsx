import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import CustomAlert from '../../../components/alert/CustomAlert';

describe('When I call a alert', () => {
  const alertMessage = 'test message';

  it('should render with correctly message', () => {
    render(<CustomAlert hidden={false} status="success" message={alertMessage} />);

    expect(screen.getByText(alertMessage)).toBeInTheDocument();
  });

  it('should close alert', async () => {
    render(<CustomAlert hidden={false} status="success" message={alertMessage} onClose={() => { }} />);
    fireEvent.click(await screen.findByRole('button'));
  });
});
