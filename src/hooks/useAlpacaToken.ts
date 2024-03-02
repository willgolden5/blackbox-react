import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const useAlpacaToken = async () => {
  const { mutateAsync: getAccessToken } =
    api.alpaca.getAccessToken.useMutation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code") ?? "";

  useEffect(() => {
    if (authCode.length > 0) {
      getAccessToken({ authCode })
        .then((data) => {
          if (data.token_type && data.access_token) {
            setAccessToken(`${data.token_type} ${data.access_token}`);
          }
        })
        .catch(() => setAccessToken(null));
    } else {
      setAccessToken(null);
    }
  }, [authCode]);

  return { accessToken };
};

export default useAlpacaToken;
