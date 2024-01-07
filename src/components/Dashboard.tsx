import React from "react";
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
                  <div className="flex w-full justify-between align-middle">
                    <p className="pb-2">
                      Current Value: ${alpData?.last_equity}
                    </p>
                    <p className="pb-2">
                      Buying Power: ${alpData?.buying_power}
                    </p>
                  </div>
                  <div className="flex w-full justify-between align-middle">
                    <p className="pb-2">Gains: ${alpData?.last_equity}</p>
                    <p className="pb-2">Return: ${alpData?.buying_power}</p>
                  </div>

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
      </section>
    </div>
  );
};

export default Dashboard;
