import { create } from 'zustand';

export const useTransactionStore = create((set) => ({
  transactions: [
    { id: 1, type: 'deposit', amount: 1000, date: '2025-03-10' },
    { id: 2, type: 'withdrawal', amount: 300, date: '2025-03-11' },
  ],
  filter: 'all',
  addTransaction: (type, amount, date) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { id: Date.now(), type, amount: parseFloat(amount), date },
      ],
    })),
  editTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedTransaction } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  setFilter: (filter) => set({ filter }),
}));