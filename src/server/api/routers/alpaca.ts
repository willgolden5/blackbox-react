import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const CLIENT_ID = process.env.ALPACA_CLIENT_ID;
const CLIENT_SECRET = process.env.ALPACA_CLIENT_SECRET;

export const alpacaRouter = createTRPCRouter({
  getPortfolioHistory: protectedProcedure
    .input(
      z.object({ timeframe: z.enum(["1Min", "5Min", "15Min", "1H", "1D"]) }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session.user.alpacaId);
      const response = await fetch(
        `https://api.alpaca.markets/v2/account/portfolio/history?timeframe=${input.timeframe}&intraday_reporting=market_hours&pnl_reset=per_day`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${ctx.session.user.alpacaId}`,
          },
        },
      );
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }),
  getAccessToken: publicProcedure
    .input(z.object({ authCode: z.string() }))
    .mutation(async ({ input }) => {
      const redirectUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/"
          : "https://blackboxquant.com/";
      const url = "https://api.alpaca.markets/oauth/token";
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: input.authCode,
        client_id: CLIENT_ID || "",
        client_secret: CLIENT_SECRET || "",
        redirect_uri: redirectUrl,
      });

      console.log("body:", body);

      console.log("body:", body);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching Alpaca token:", error);
      }
    }),
});
