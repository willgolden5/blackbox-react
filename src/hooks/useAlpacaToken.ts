// hook that takes the auth code from the url and sends it to the server/alpaca to get the access token
// 1. get the auth code from the url
// 2. use trpc to fetch the access token
// 3. return the access token

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
