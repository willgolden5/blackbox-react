import React, { use } from "react";
import Card from "./DesignSystem/Card";
import Button from "./DesignSystem/Button";
import { api } from "~/utils/api";
import StrategyPanel from "./StrategyPanel";
import { useSession } from "next-auth/react";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const { data: alpData } = api.alpaca.getAccount.useQuery();

  return (
    <div className="container mx-auto flex flex-col p-4">
      <h1 className="text-left text-3xl font-bold">
        Hello {session?.user.name}!
      </h1>
      <p className="mb-6 ">Manage your account below.</p>
      <section
        aria-label="Portfolio Information"
        className="flex w-full flex-col items-center justify-center md:flex-row md:items-stretch"
      >
        <div className="mr-4 w-[100%] pb-8">
          <>
            <div className="w-full">
              <div className="flex w-full justify-between align-middle">
                <p className="pb-2">Current Value: ${alpData?.last_equity}</p>
                <p className="pb-2">Buying Power: ${alpData?.buying_power}</p>
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
