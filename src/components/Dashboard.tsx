import React from "react";

// Assuming you have a type for the strategy data
type Strategy = {
  name: string;
  cagr: number;
  beta: number;
  sharpe: number;
};

const strategies: Strategy[] = [
  { name: "US Congress Long", cagr: 3, beta: -9, sharpe: 1.19 },
  // ... other strategies
];

const Dashboard: React.FC = () => {
  // Replace with state, context, or props as necessary
  const balance = 2000.0;
  const activeStrategy = strategies[0]; // This would be dynamic in a real app

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Trade Dashboard</h1>

      <section aria-label="Account Information" className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Your Account:</h2>
        <div className="flex items-center justify-center rounded-lg bg-gray-200 p-4">
          {/* Placeholder for account graph or info */}
          <span>Account Graph Here</span>
        </div>
      </section>

      <section aria-label="Portfolio Information">
        <h2 className="mb-2 text-xl font-semibold">Your Portfolio:</h2>
        <p className="mb-1">Balance: ${balance.toFixed(2)}</p>
        <p className="mb-4">Active Strategy: {activeStrategy?.name}</p>
        <div className="mb-4 flex gap-4">
          <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Manage Alpaca Account
          </button>
          <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Fund your Account
          </button>
        </div>
        <button className="mb-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          Liquidate All Positions
        </button>
        <div className="rounded-lg bg-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="strategy-picker" className="mb-2 block">
                Strategy Picker
              </label>
              <select
                id="strategy-picker"
                className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {strategies.map((strategy, index) => (
                  <option key={index} value={strategy.name}>
                    {strategy.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>CAGR: {activeStrategy?.cagr}%</p>
              <p>Beta: {activeStrategy?.beta}%</p>
              <p>Sharpe: {activeStrategy?.sharpe}</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800">
            Trade
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
