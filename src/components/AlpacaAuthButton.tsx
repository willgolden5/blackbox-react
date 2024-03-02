import { createOauthUrl } from "~/utils/alpaca";
import Button from "./DesignSystem/Button";
import { useRouter } from "next/router";
import useAlpacaToken from "~/hooks/useAlpacaToken";
import { useEffect } from "react";

const AlpacaAuthButton = () => {
  const router = useRouter();
  const data = useAlpacaToken();
  const handleRedirect = () => {
    const url = createOauthUrl(
      process.env.NEXT_PUBLIC_ALPACA_CLIENT_ID as string,
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://blackboxquant.com/",
    );

    router.push(url);
  };

  useEffect(() => {
    (async () => {
      const token = await data;
      console.log("token:", token);
    })();
  }, [data]);
  return (
    <Button className="w-full bg-yellow" onClick={handleRedirect}>
      Authorize with{" "}
      <img className="ml-2 w-[50%]" src="/alpacaLogo.png" alt="Alpaca Logo" />
    </Button>
  );
};

export default AlpacaAuthButton;
