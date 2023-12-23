import React, { useEffect } from "react";
import TradeForm from "./TradeForm";
import Card from "./DesignSystem/Card";
import Button from "./DesignSystem/Button";
import { api } from "~/utils/api";

// Assuming you have a type for the strategy data
type Strategy = {
  name: string;
  id: string;
};

const strategies: Strategy[] = [
  { name: "US Congress Long", id: "us-congress-long" },
  { name: "Nancy Pelosi", id: "nancy-pelosi" },
  // ... other strategies
];

const Dashboard: React.FC = () => {
  const { data: alpData } = api.alpaca.getAccount.useQuery();
  const { data: positionData } = api.alpaca.getPositions.useQuery();
  const activeStrategy = strategies[0]; // This would be dynamic in a real app

  return (
    <div className="container mx-auto flex flex-col p-4">
      <h1 className="mb-6 ml-auto mr-auto text-3xl font-bold">Dashboard</h1>
      <section
        aria-label="Portfolio Information"
        className="flex w-full flex-col items-center justify-center md:flex-row md:items-stretch"
      >
        <div className="mr-4 w-[75%] pb-8">
          <Card
            heading="Your Portfolio:"
            body={
              <>
                <div className="w-full">
                  <p className="pb-2">
                    Portfolio Value: ${alpData?.last_equity}
                  </p>
                  <p className="pb-2">Balance: ${}</p>
                  <p className="pb-6">
                    Active Strategy: {activeStrategy?.name}
                  </p>
                  <div className="flex w-full flex-col space-y-5">
                    <a className="flex w-full flex-col space-y-5" href="">
                      <Button className="rounded bg-yellow px-4 py-2">
                        Manage Account
                      </Button>
                    </a>
                    <a className="flex w-full flex-col space-y-5" href="">
                      <Button className="rounded bg-green px-4 py-2">
                        Fund your Account
                      </Button>
                    </a>
                    <Button className="rounded bg-orange px-4 py-2">
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
