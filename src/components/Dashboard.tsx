import React, { useEffect, useState } from "react";
import Button from "./DesignSystem/Button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ChartComponent from "./charts/LineChart";

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState([]);
  const [gains, setGains] = useState(0);
  const { data: session } = useSession();
  const { data: alpData } = api.alpaca.getAccount.useQuery();
  const { data: portfolioData } = api.alpaca.getPortfolioHistory.useQuery();

  useEffect(() => {
    const data =
      (portfolioData &&
        portfolioData.timestamp?.map((ts, index) => ({
          time: new Date(ts * 1000).toISOString().split("T")[0], // Converts timestamp to YYYY-MM-DD format
          value: portfolioData.equity ? portfolioData.equity[index] : null, // Matches equity value by index
        }))) ??
      [];

    setChartData(data);

    const gains =
      portfolioData?.equity[portfolioData.equity.length - 1] -
      portfolioData?.equity[0];
    setGains(gains);
    console.log(alpData);
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
              <div className="flex w-full justify-between align-middle">
                <p className="pb-2">Current Value: ${alpData?.last_equity}</p>
                <p className="pb-2">Buying Power: ${alpData?.buying_power}</p>
              </div>
              <div className="flex w-full justify-between align-middle">
                <p className="pb-2">Gains: ${gains}</p>
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
