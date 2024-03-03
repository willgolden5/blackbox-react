import { useRouter } from "next/router";
import Button from "~/components/DesignSystem/Button";
import { useToast } from "~/hooks/useToast";
import { api } from "~/utils/api";

export default function StrategyProfile() {
  const { asPath } = useRouter();
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: setStrategy } = api.user.setActiveStrategy.useMutation();
  const { data: alpacaAccount } = api.alpaca.getAccountData.useQuery();
  const { data } = api.strategy.getInfoByName.useQuery({
    name: asPath.split("/")[2] as string,
  });

  const setActiveStrategy = () => {
    if (!alpacaAccount) {
      toast(
        "No Alpaca Account Found",
        "Please connect your Alpaca account before trading.",
        "error",
      );
    }
    setStrategy({
      strategy: data?.name as string,
      amount: parseFloat(alpacaAccount?.buying_power as string),
    }).then(() => {
      toast(
        "Strategy Activated!",
        `You are now trading the ${data?.name
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")} strategy on Blackbox.`,
        "success",
      );
      router.push("/");
    });
  };

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
          <Button onClick={setActiveStrategy} className="w-full bg-green">
            Trade
          </Button>
        </div>
      </div>
    </div>
  );
}
