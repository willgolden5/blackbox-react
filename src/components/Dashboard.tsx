import React from "react";
import TradeForm from "./TradeForm";

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
      {/* 
      <section aria-label="Account Information" className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Your Account:</h2>
        <div className="flex items-center justify-center rounded-lg bg-gray-200 p-4">
          <span>Account Graph Here</span>
        </div>
      </section> */}
      <section
        aria-label="Portfolio Information"
        className="flex w-full justify-center gap-4"
      >
        <div className="w-full">
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
        </div>
        <TradeForm
          strategies={strategies}
          activeStrategy={activeStrategy as Strategy}
        />
      </section>
    </div>
  );
};

export default Dashboard;
