import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        internal: z.object({
          name: z.string(),
          password: z.string(),
          email: z.string(),
          phone: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { internal } = input;
      let error = null;
      bcrypt.genSalt(12, async function (err, salt) {
        bcrypt.hash(input.internal.password, salt, async function (err, hash) {
          // Store hash in database here
          await ctx.db.user
            .create({
              data: {
                name: internal.name,
                password: hash,
                email: internal.email,
                phone: internal.phone,
              },
            })
            .catch((err) => (error = err));
        });
      });
      if (error) {
        return "user already exists";
      }
    }),
  get: publicProcedure
    .input(
      z.object({
        email: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
  interestSignup: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.interestList.create({
        data: {
          email: input.email,
        },
      });
    }),
  hasActiveStrategy: protectedProcedure.query(async ({ ctx }) => {
    const temp = await ctx.db.activeStrategies.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    console.log(temp);
    return temp;
  }),
  setActiveStrategy: protectedProcedure
    .input(z.object({ strategy: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.activeStrategies
        .upsert({
          where: {
            userId: ctx.session.user.id,
          },
          update: {
            strategyId: input.strategy,
            amount: input.amount,
          },
          create: {
            userId: ctx.session.user.id,
            alpacaid: ctx.session.user.alpacaId,
            amount: input.amount,
            strategyId: input.strategy,
          },
        })
        .then(async (data) => {
          await fetch(
            `${process.env.API_URL}/rebalance?activeStrategyId=${data.id}`,
            {
              headers: {
                "X-API-KEY": process.env.API_KEY || "",
              },
            },
          )
            .then((res) => console.log("Success rebalance. Response: ", res))
            .catch((err) => console.error("Error rebalancing. Error: ", err));
        })
        .catch((err) =>
          console.error("Error setting Active Strategy. Error: ", err),
        );
    }),
  removeActiveStrategy: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.activeStrategies.delete({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  setAlpacaId: protectedProcedure
    .input(z.object({ alpacaId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.alpacaId.includes("undefined")) return;
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          alpacaId: input.alpacaId,
        },
      });
    }),
});
