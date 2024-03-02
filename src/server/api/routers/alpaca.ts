import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

const CLIENT_ID = process.env.ALPACA_CLIENT_ID;
const CLIENT_SECRET = process.env.ALPACA_CLIENT_SECRET;

export const alpacaRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        password: z.string(),
        email: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let error = null;
      const hashPass = bcrypt.hashSync(input.password, 10);
      await ctx.db.user
        .create({
          data: {
            name: input.name,
            password: hashPass,
            email: input.email,
            phone: input.phone,
          },
        })
        .catch((err) => (error = err));

      if (error) {
        return "user already exists";
      } else {
        return "user created successfully";
      }
    }),
  getAccount: protectedProcedure.query(async ({ ctx }) => {
    return await fetch(
      `${process.env.API_URL}/account/?id=${ctx.session.user.alpacaId}`,
    ).then(async (res) => {
      const data = await res.json();
      return data;
    });
  }),
  getPositions: protectedProcedure.query(async ({ ctx }) => {
    return await fetch(
      `https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/${ctx.session.user.alpacaId}/account/portfolio/history`,
    ).then(async (res) => {
      const data = await res.json();
      return data;
    });
  }),
  getPortfolioHistory: protectedProcedure.query(async ({ ctx }) => {
    return await fetch(
      `https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/${ctx.session.user.alpacaId}/account/portfolio/history`,
      {
        headers: {
          Authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`,
        },
      },
    ).then(async (res) => {
      const data = await res.json();
      return data;
    });
  }),
  liquidateAccount: protectedProcedure
    .input(z.object({ alpacaId: z.string() }))
    .query(async ({ input }) => {
      return await fetch(
        `${process.env.API_URL}/liquidate/${input.alpacaId}`,
      ).then(async (res) => {
        const data = await res.json();
        return data;
      });
    }),
  // this should be able to be used asynchonously
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
        return data; // This will be the JSON response.
      } catch (error) {
        console.error("Error fetching Alpaca token:", error);
        throw error; // Ensure your tRPC error handling logic can handle this.
      }
    }),
});
