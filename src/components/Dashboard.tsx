import React, { useEffect, useState } from "react";
import Button from "./DesignSystem/Button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ChartComponent from "./charts/LineChart";
import { set } from "zod";

type AccountData = {
  value: string;
  gains: string;
};

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState([]);
  const [accountData, setAccountData] = useState({} as AccountData);
  const { data: session } = useSession();
  const { data: alpData } = api.alpaca.getAccount.useQuery();
  const { data: portfolioData } = api.alpaca.getPortfolioHistory.useQuery();

  useEffect(() => {
    if (!portfolioData) return;
    const gains =
      parseFloat(portfolioData.equity[portfolioData.equity.length - 1]) -
      parseFloat(portfolioData.equity[0]);
    setAccountData({
      value: parseFloat(
        portfolioData.equity[portfolioData.equity.length - 1],
      ).toFixed(2),
      gains: gains.toFixed(2),
    });

    console.log(portfolioData);

    const data = portfolioData.timestamp
      ? portfolioData.timestamp
          .reduce(
            (
              acc: { time: string | undefined; value: any; count: number }[],
              ts: number,
              index: string | number,
            ) => {
              // Convert timestamp to YYYY-MM-DD format
              const time = new Date(ts * 1000).toISOString().split("T")[0];
              const value = portfolioData.equity
                ? portfolioData.equity[index]
                : null;

              // Check if this time already exists in the accumulator
              const existing = acc.find(
                (item: { time: string | undefined }) => item.time === time,
              );
              if (existing) {
                // If it exists, update the value with the new value
                existing.value = value;
              } else {
                // If it doesn't exist, add it to the accumulator
                acc.push({ time, value, count: 1 });
              }
              return acc;
            },
            [],
          )
          .map(({ time, value }: { time: string | undefined; value: any }) => ({
            time,
            value,
          })) // Remove count from the final data
      : [];

    setChartData(data);
  }, [portfolioData]);

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
          <ChartComponent data={chartData} />
          <>
            <div className="w-full">
              <div className="ot ot flex w-full justify-between py-4 align-middle">
                <p className="pb-2">Current Value: ${accountData.value}</p>
                <p className="pb-2">Gains: ($) {accountData.gains}</p>
                {/* <p className="pb-2">Buying Power: ${alpData?.buying_power}</p> */}
              </div>
              <div className="flex w-full justify-between align-middle">
                {/* <p className="pb-2">Return: ${alpData?.buying_power}</p> */}
              </div>

              <div className="flex w-full flex-row space-x-5">
                <Button className="w-full rounded bg-yellow px-4 py-2 ">
                  Manage Account
                </Button>
                <Button className="w-full rounded bg-green px-4 py-2">
                  Fund your Account
                </Button>
                <Button className="w-full rounded bg-orange px-4 py-2">
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
