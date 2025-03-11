import React from 'react';
import { useTransactionStore } from '../store/transactionStore';

export default function Summary() {
  const { transactions } = useTransactionStore();

  const balance = transactions.reduce((acc, t) => {
    return t.type === 'deposit' ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
      <h2 className="text-xl font-semibold text-gray-800">Balance</h2>
      <p className={`text-2xl ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        ${balance.toFixed(2)}
      </p>
    </div>
  );
}