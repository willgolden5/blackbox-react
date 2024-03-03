export const createOauthUrl = (clientId: string, redirectUri: string) =>
  `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ALPACA_CLIENT_ID}&redirect_uri=${redirectUri}&scope=account:write%20trading`;

export type AlpacaAccountResponse = {
  account_blocked: boolean;
  account_number: string;
  accrued_fees: string;
  admin_configurations: {
    allow_instant_ach: boolean;
  };
  balance_asof: string;
  bod_dtbp: string;
  buying_power: string;
  cash: string;
  created_at: string;
  crypto_status: string;
  currency: string;
  daytrade_count: number;
  daytrading_buying_power: string;
  effective_buying_power: string;
  equity: string;
  id: string;
  initial_margin: string;
  last_equity: string;
  last_maintenance_margin: string;
  long_market_value: string;
  maintenance_margin: string;
  multiplier: string;
  non_marginable_buying_power: string;
  pattern_day_trader: boolean;
  pending_transfer_in: string;
  portfolio_value: string;
  position_market_value: string;
  regt_buying_power: string;
  short_market_value: string;
  shorting_enabled: boolean;
  sma: string;
  status: string;
  trade_suspended_by_user: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
  user_configurations: null | { [key: string]: any }; // Assuming it might hold an object with unknown properties
};
