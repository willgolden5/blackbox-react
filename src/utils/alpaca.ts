// make this function create the following url:
// https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=6c41c11c0633aff59d424f450ea4969b&redirect_uri=http://localhost:3000/&scope=account:write%20trading

export const createOauthUrl = (clientId: string, redirectUri: string) =>
  `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=6c41c11c0633aff59d424f450ea4969b&redirect_uri=${redirectUri}&scope=account:write%20trading`;
