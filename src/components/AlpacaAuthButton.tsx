import { createOauthUrl } from "~/utils/alpaca";
import Button from "./DesignSystem/Button";
import { useRouter } from "next/router";
import useAlpacaToken from "~/hooks/useAlpacaToken";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const AlpacaAuthButton = () => {
  const [hasSetAlpacaId, setHasSetAlpacaId] = useState(false);
  const router = useRouter();
  const data = useAlpacaToken();
  const { mutate: setAlpacaId, isLoading } = api.user.setAlpacaId.useMutation();
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
      if (!isLoading && token.accessToken && !hasSetAlpacaId) {
        setAlpacaId({ alpacaId: token.accessToken });
        setHasSetAlpacaId(true);
      }
    })();
  }, [data, isLoading]);

  return (
    <Button className="w-full bg-yellow" onClick={handleRedirect}>
      Authorize with{" "}
      <img className="ml-2 w-[50%]" src="/alpacaLogo.png" alt="Alpaca Logo" />
    </Button>
  );
};

export default AlpacaAuthButton;
