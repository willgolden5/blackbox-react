import { useRouter } from "next/router";
import Button from "~/components/DesignSystem/Button";
import { api } from "~/utils/api";

export default function StrategyProfile() {
  const { asPath } = useRouter();
  const { data } = api.strategy.getInfoByName.useQuery({
    name: asPath.split("/")[2] as string,
  });
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="max-w-[600px]">
        <img src={data?.image} className="w-full" />
        <div className="">
          <h2 className="text-xl font-normal">Performance:</h2>
          <div className="flex w-full space-x-4">
            <div className="flex w-full flex-col">
              <p className="text-sm font-light ">Average Return:</p>
              <p className="text-green">{data?.technicalData.yoyAverage}%</p>
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm font-light">Last Years Return:</p>
              <p className="text-green">{data?.technicalData.lastYear}%</p>
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm font-light">Sharpe Ratio:</p>
              <p className="">{data?.technicalData.sharpeRatio}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-normal">About:</h2>
          <p className="text-sm font-light">{data?.description}</p>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-normal">Holdings:</h2>
          <div className="flex flex-col">
            {data?.holdings.map((holding) => (
              <div className="flex w-full justify-between">
                <p className="text-sm font-light">{holding.ticker}</p>
                <p className="text-sm font-light">{holding.weight * 100}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full pt-8">
          <Button className="w-full bg-green">Trade</Button>
        </div>
      </div>
    </div>
  );
}
