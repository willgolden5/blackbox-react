import { createOauthUrl } from "~/utils/alpaca";
import Button from "./DesignSystem/Button";
import { useRouter } from "next/router";

const AlpacaAuthButton = () => {
  const router = useRouter();
  const handleRedirect = () => {
    const url = createOauthUrl(
      process.env.NEXT_PUBLIC_ALPACA_CLIENT_ID as string,
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://blackboxquant.com/",
    );

    router.push(url);
  };
  return (
    <Button className="w-full bg-yellow" onClick={handleRedirect}>
      Authorize With Alpaca
    </Button>
  );
};

export default AlpacaAuthButton;
