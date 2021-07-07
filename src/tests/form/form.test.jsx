import React from 'react';
import {
  screen, render, fireEvent, within,
} from '@testing-library/react';

import Form from '../../components/form';
import { correctFields, correctMainButton, correctSecondaryButton } from './constants';

describe('When I create a valid Form component', () => {
  it('should render all the textfield fields received', () => {
    render(<Form fields={correctFields} mainButton={correctMainButton} />);

    const textfieldFields = correctFields.filter((field) => field.componentType === 'textfield');
    textfieldFields.forEach((field) => {
      const input = screen.getByLabelText(field.label);
      expect(input).toBeInTheDocument();
    });
  });

  it('should render all the autocomplete fields received', () => {
    render(<Form fields={correctFields} mainButton={correctMainButton} />);

    const autocompleteFields = correctFields.filter((field) => field.componentType === 'autocomplete');
    const autocompleteFieldsRendered = screen.getAllByTestId('form-autocomplete');

    expect(autocompleteFieldsRendered).toHaveLength(autocompleteFields.length);
  });

  it('should render the main button', () => {
    render(<Form fields={correctFields} mainButton={correctMainButton} />);

    const button = screen.getByText(correctMainButton.text);

    expect(button).toBeInTheDocument();
  });

  it('should not render the secondary button if not used', () => {
    render(<Form fields={correctFields} mainButton={correctMainButton} />);

    const actionDiv = screen.getByTestId('form-actions');
    const buttons = within(actionDiv).getAllByRole('button');

    expect(buttons).toHaveLength(1);
  });

  it('should render the secondary button if passed', () => {
    render(
      <Form
        fields={correctFields}
        mainButton={correctMainButton}
        secondaryButton={correctSecondaryButton}
      />,
    );

    const button = screen.getByText(correctSecondaryButton.text);

    expect(button).toBeInTheDocument();
  });

  describe('and I click the main submit button', () => {
    it('should call the onSubmit function', () => {
      const submitFunction = jest.fn(() => {});
      const mainSubmitButton = { ...correctMainButton, onSubmit: submitFunction };
      render(<Form fields={correctFields} mainButton={mainSubmitButton} />);
      const submitButton = screen.getByText(mainSubmitButton.text);
      fireEvent.click(submitButton);
      expect(submitFunction).toHaveBeenCalled();
    });
  });

  describe('and I click the secondary submit button', () => {
    it('should call the onSubmit function', () => {
      const submitFunction = jest.fn(() => {});
      const secondarySubmitButton = { ...correctSecondaryButton, onSubmit: submitFunction };
      render(
        <Form
          fields={correctFields}
          mainButton={correctMainButton}
          secondaryButton={secondarySubmitButton}
        />,
      );
      const submitButton = screen.getByText(secondarySubmitButton.text);
      fireEvent.click(submitButton);
      expect(submitFunction).toHaveBeenCalled();
    });
  });
});
