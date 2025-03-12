import React from 'react';
import { useTransactionStore } from '../store/transactionStore'; // Should match your store file
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetSummary() {
  const { transactions } = useTransactionStore(); // Adjust based on your store

  const totalDeposits = transactions
    .filter((t) => t.type === 'deposit')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalWithdrawals = transactions
    .filter((t) => t.type === 'withdrawal')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const balance = totalDeposits - totalWithdrawals;

  const chartData = {
    labels: ['Deposits', 'Withdrawals'],
    datasets: [
      {
        data: [totalDeposits, totalWithdrawals],
        backgroundColor: ['#10B981', '#EF4444'], // Green for deposits, red for withdrawals
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: $${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-800">Transaction Summary</h2>
      <p className="text-gray-600">Deposits: ${totalDeposits.toFixed(2)}</p>
      <p className="text-gray-600">Withdrawals: ${totalWithdrawals.toFixed(2)}</p>
      <p className={`text-lg ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
        Balance: ${balance.toFixed(2)}
      </p>
      <div className="h-64 mt-4">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}