import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Strategies = () => {
  const router = useRouter();
  const { data: strategyInfo } = api.strategy.getStrategyCardInfo.useQuery();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="w-full max-w-[600px]">
        <p className=" text-2xl font-semibold">Select a Strategy</p>
        <p className="text-sm font-light">
          Select from our strategies below to get started
        </p>
        <div className="cursor-pointer space-y-4 divide-y-2">
          {strategyInfo?.map((strat) => {
            return (
              <div
                onClick={() => router.push(`/strategies/${strat.name}`)}
                className="flex w-full items-center justify-between space-x-4 px-2 py-4"
              >
                <div className="flex w-full items-center space-x-4 px-4">
                  <img
                    className="w-[70px]"
                    src={strat.image}
                    alt="strategy pic"
                  />
                  <div>
                    <p className="text-xl font-semibold">
                      {strat.name
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </p>
                    <p className="text-xs font-light">{strat.category}</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs font-light">Yearly return: </p>
                      <p className="text-green">
                        {strat.technicalData.yoyAverage}%
                      </p>
                    </div>
                  </div>
                </div>
                <FontAwesomeIcon className="pr-4" icon={faChevronRight} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Strategies;
