import { StrategyCardInfo } from "~/server/api/routers/strategies";
import Accordion from "./DesignSystem/Accordion";
import Button from "./DesignSystem/Button";

type PanelProps = {
  data: StrategyCardInfo;
};

const StrategyPanel = ({ data }: PanelProps) => {
  const stratName = data.name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <Accordion
      question={
        <div className="flex w-full items-center space-x-4 px-4 align-middle">
          <img className="w-[40px]" src={data.image} alt="strategy pic" />
          <p className="">{stratName}</p>
          <div className="flex items-center space-x-2">
            <p className="text-xs font-light">Yearly return: </p>
            <p className="text-white">{data.technicalData.yoyAverage}%</p>
          </div>
        </div>
      }
      answer={
        <div className="space-y-4">
          <div className="">
            <h2 className="text-xl font-normal">Performance:</h2>
            <div className="flex w-full space-x-4">
              <div className="flex w-full flex-col">
                <p className="text-sm font-light ">Average Return:</p>
                <p className="text-green">{data.technicalData.yoyAverage}%</p>
              </div>
              <div className="flex w-full flex-col">
                <p className="text-sm font-light">Last Years Return:</p>
                <p className="text-green">{data.technicalData.lastYear}%</p>
              </div>
              <div className="flex w-full flex-col">
                <p className="text-sm font-light">Sharpe Ratio:</p>
                <p className="">{data.technicalData.sharpeRatio}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-normal">About:</h2>
            <p className="text-sm font-light">{data.description}</p>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-normal">Holdings:</h2>
            <div className="flex flex-col">
              {data.holdings.map((holding) => (
                <div className="flex w-full justify-between">
                  <p className="text-sm font-light">{holding.ticker}</p>
                  <p className="text-sm font-light">{holding.weight * 100}%</p>
                </div>
              ))}
            </div>
            {/* <Accordion question="Holdings" answer={<div></div>} /> */}
          </div>
          <div className="w-full p-2">
            <Button className="w-full bg-green">Trade</Button>
          </div>
        </div>
      }
    />
  );
};

export default StrategyPanel;
