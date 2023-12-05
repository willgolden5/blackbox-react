import React from "react";
import TradeForm from "./TradeForm";
import Card from "./DesignSystem/Card";
import Button from "./DesignSystem/Button";

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
      <section
        aria-label="Portfolio Information"
        className="flex w-full justify-center"
      >
        <div className="mr-4 w-[75%]">
          <Card
            heading="Your Portfolio:"
            body={
              <>
                <div className="w-full">
                  <p className="pb-2">Balance: ${balance.toFixed(2)}</p>
                  <p className="">Active Strategy: {activeStrategy?.name}</p>
                  <div className="flex w-full flex-col space-y-2">
                    <Button className="bg-yellow rounded px-4 py-2 text-white hover:bg-green-600">
                      Manage Alpaca Account
                    </Button>
                    <Button className="bg-green rounded px-4 py-2 text-white hover:bg-green-600">
                      Fund your Account
                    </Button>
                    <Button className="bg-orange rounded px-4 py-2 text-white ">
                      Liquidate All Positions
                    </Button>
                  </div>
                </div>
              </>
            }
          />
        </div>
        <div className="w-[75%]">
          <TradeForm
            strategies={strategies}
            activeStrategy={activeStrategy as Strategy}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
