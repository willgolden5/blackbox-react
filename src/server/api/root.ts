import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/users";
import { alpacaRouter } from "./routers/alpaca";
import { strategyRouter } from "./routers/strategies";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  alpaca: alpacaRouter,
  strategy: strategyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
