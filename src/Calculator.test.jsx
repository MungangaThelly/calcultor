import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './components/calculator/Calculator';

describe('Kalkylator', () => {
  const setup = () => {
    render(<Calculator />);
    return {
      num1Input: screen.getByLabelText('Första numret'),
      num2Input: screen.getByLabelText('Andra numret'),
      operationSelect: screen.getByLabelText('Operation'),
      calculateButton: screen.getByText('Beräkna')
    };
  };

  const testCases = [
    { operation: '+', num1: '5', num2: '3', expected: '8', description: 'adderar två tal' },
    { operation: '-', num1: '5', num2: '3', expected: '2', description: 'subtraherar två tal' },
    { operation: '*', num1: '5', num2: '3', expected: '15', description: 'multiplicerar två tal' },
    { operation: '/', num1: '6', num2: '3', expected: '2', description: 'dividerar två tal' }
  ];

  testCases.forEach(({ operation, num1, num2, expected, description }) => {
    it(description, () => {
      const { num1Input, num2Input, operationSelect, calculateButton } = setup();
      
      fireEvent.change(num1Input, { target: { value: num1 } });
      fireEvent.change(num2Input, { target: { value: num2 } });
      if (operation !== '+') { // + är default i komponenten
        fireEvent.change(operationSelect, { target: { value: operation } });
      }
      fireEvent.click(calculateButton);
      
      expect(screen.getByText(`Resultat: ${expected}`)).toBeInTheDocument();
    });
  });
});