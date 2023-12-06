import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

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
  getAccount: protectedProcedure.query(async () => {
    return await fetch("https://blackbox-nest.fly.dev/account").then(
      async (res) => {
        const data = await res.json();
        return data;
      },
    );
  }),
  getPositions: protectedProcedure.query(async () => {
    return await fetch("https://blackbox-nest.fly.dev/positions").then(
      async (res) => {
        const data = await res.json();
        return data;
      },
    );
  }),
  liquidateAccount: protectedProcedure.query(async () => {
    return await fetch("https://blackbox-nest.fly.devliquidate").then(
      async (res) => {
        const data = await res.json();
        return data;
      },
    );
  }),
});
