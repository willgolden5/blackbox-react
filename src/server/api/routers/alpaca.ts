import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";
import { useSession } from "next-auth/react";

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
      `${process.env.API_URL}/positions/?id=${ctx.session.user.alpacaId}`,
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
});
