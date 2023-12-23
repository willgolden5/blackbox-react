import { Strategy } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const strategyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }): Promise<Strategy[]> => {
    const strats = await ctx.db.strategy.findMany({
      where: { active: true },
    });
    return strats;
  }),
});
