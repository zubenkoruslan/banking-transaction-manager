import React from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/BudgetSummary';
import { useTransactionStore } from './store/transactionStore';

export default function App() {
  const { setFilter } = useTransactionStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Banking Transaction Manager</h1>
        <p className="text-gray-600">Track your deposits and withdrawals</p>
      </header>
      <main className="max-w-4xl mx-auto">
        <TransactionForm />
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            All
          </button>
          <button
            onClick={() => setFilter('deposit')}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Deposits
          </button>
          <button
            onClick={() => setFilter('withdrawal')}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Withdrawals
          </button>
        </div>
        <Summary />
        <TransactionList />
      </main>
    </div>
  );
}