import { StrategyInfo } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export type StrategyCardInfo = {
  name: string;
  description: string;
  image: string;
  category: string;
  technicalData: {
    yoyAverage: string;
    lastYear: string;
    sharpeRatio: string;
  };
  holdings: {
    ticker: string;
    weight: number;
  }[];
};

type Holding = {
  ticker: string;
  weight: number;
};

export type StrategyData = {
  name: string;
  description: string;
  image: string;
  category: string;
  technicalData: {
    yoyAverage: string;
    lastYear: string;
    sharpeRatio: string;
  };
  holdings: Holding[];
};
export const strategyRouter = createTRPCRouter({
  getStrategyCardInfo: protectedProcedure.query(
    async ({ ctx }): Promise<StrategyCardInfo[]> => {
      let formattedStrats: StrategyCardInfo[] = [];
      const strats = await ctx.db.strategyInfo.findMany();
      const congressBuy = await ctx.db.congressBuys.findMany();
      const congressBuyWeights = congressBuy.map((weight) => {
        return {
          ticker: weight.ticker,
          weight: weight.navPercentage,
        };
      });
      const nancyPelosi = await ctx.db.nancyPelosi.findMany();
      const nancyWeights = nancyPelosi.map((weight) => {
        return {
          ticker: weight.ticker,
          weight: weight.navPercentage,
        };
      });

      strats.forEach((strat) => {
        if (strat.name === "congress_buys") {
          formattedStrats.push({
            name: strat.name,
            description: strat.about,
            image: strat.image as string,
            category: strat.category as string,
            technicalData: {
              yoyAverage: strat.averageYoYReturn,
              lastYear: strat.lastYearReturn,
              sharpeRatio: strat.sharpeRatio,
            },
            holdings: congressBuyWeights,
          });
        }
        if (strat.name === "nancy_pelosi") {
          formattedStrats.push({
            name: strat.name,
            description: strat.about,
            image: strat.image as string,
            category: strat.category as string,
            technicalData: {
              yoyAverage: strat.averageYoYReturn,
              lastYear: strat.lastYearReturn,
              sharpeRatio: strat.sharpeRatio,
            },
            holdings: nancyWeights,
          });
        }
      });
      return formattedStrats;
    },
  ),
  getInfoByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const congressBuy = await ctx.db.congressBuys.findMany();
      const congressBuyWeights = congressBuy.map((weight) => {
        return {
          ticker: weight.ticker,
          weight: weight.navPercentage,
        };
      });
      const nancyPelosi = await ctx.db.nancyPelosi.findMany();
      const nancyWeights = nancyPelosi.map((weight) => {
        return {
          ticker: weight.ticker,
          weight: weight.navPercentage,
        };
      });
      const strat: StrategyInfo | null = await ctx.db.strategyInfo.findUnique({
        where: { name: input.name },
      });
      return {
        name: strat?.name as string,
        description: strat?.about as string,
        image: strat?.image as string,
        category: strat?.category as string,
        technicalData: {
          yoyAverage: strat?.averageYoYReturn as string,
          lastYear: strat?.lastYearReturn as string,
          sharpeRatio: strat?.sharpeRatio as string,
        },
        holdings:
          strat?.name === "congress_buys" ? congressBuyWeights : nancyWeights,
      } as StrategyData;
    }),
  getCongressBuysHoldings: protectedProcedure.query(async ({ ctx }) => {
    const holdings = await ctx.db.congressBuys.findMany();
    return holdings;
  }),
  getNancyHoldings: protectedProcedure.query(async ({ ctx }) => {
    const holdings = await ctx.db.nancyPelosi.findMany();
    return holdings;
  }),
});
