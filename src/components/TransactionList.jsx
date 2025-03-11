import React from 'react';
import { useTransactionStore } from '../store/transactionStore';

export default function TransactionList() {
  const { transactions, filter, deleteTransaction, editTransaction } = useTransactionStore();

  const filteredTransactions = transactions.filter((t) =>
    filter === 'all' ? true : t.type === filter
  );

  const handleEdit = (id) => {
    const amount = prompt('New amount:');
    if (amount && !isNaN(amount)) {
      editTransaction(id, { amount: parseFloat(amount) });
    }
  };

  return (
    <div className="mt-6">
      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTransactions.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
            >
              <span>
                {t.type === 'deposit' ? '➕' : '➖'} ${t.amount.toFixed(2)} - {t.date}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(t.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}