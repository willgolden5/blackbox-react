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
});
