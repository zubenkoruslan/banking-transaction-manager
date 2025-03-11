import { render, screen, fireEvent } from '@testing-library/react';
import TransactionForm from './TransactionForm';
import { useTransactionStore } from '../store/transactionStore';
import { vi } from 'vitest';

const mockAddTransaction = vi.fn();
vi.mock('../store/transactionStore', () => ({
  useTransactionStore: () => ({
    addTransaction: mockAddTransaction,
  }),
}));

test('adds a transaction and calls addTransaction', () => {
  render(<TransactionForm />);
  const amountInput = screen.getByPlaceholderText('Amount');
  const addButton = screen.getByText('Add');

  fireEvent.change(amountInput, { target: { value: '500' } });
  fireEvent.click(addButton);

  expect(amountInput.value).toBe(''); // Input clears
  expect(mockAddTransaction).toHaveBeenCalledWith('deposit', '500', expect.any(String)); // Check if addTransaction was called
});