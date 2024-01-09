import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function StrategyProfile() {
  const { asPath } = useRouter();
  const { data: strategyInfo } = api.strategy.getInfoByName.useQuery({
    name: asPath.split("/")[2] as string,
  });
  return <p className="mt-32">Post: {strategyInfo?.category}</p>;
}
