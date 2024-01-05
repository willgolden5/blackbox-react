import { StrategyInfo } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export type StrategyCardInfo = {
  name: string;
  description: string;
  image: string;
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

      console.log("congressBuyWeights", congressBuy);
      strats.forEach((strat) => {
        if (strat.name === "congress_buys") {
          formattedStrats.push({
            name: strat.name,
            description: strat.about,
            image: strat.image as string,
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
    .query(async ({ ctx, input }): Promise<StrategyInfo | null> => {
      const strat = await ctx.db.strategyInfo.findUnique({
        where: { name: input.name },
      });
      return strat;
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
