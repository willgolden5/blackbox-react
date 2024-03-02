export const createOauthUrl = (clientId: string, redirectUri: string) =>
  `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ALPACA_CLIENT_ID}&redirect_uri=${redirectUri}&scope=account:write%20trading`;
