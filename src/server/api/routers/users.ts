import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

// Define the schemas for the request bodies
const tradeSchema = z.object({
  alpacaId: z.string(),
  ticker: z.string(),
  notional: z.number(),
  side: z.string(),
  type: z.string(),
  time_in_force: z.string(),
});

const achRelationshipSchema = z.object({
  accountId: z.string(),
  achData: z.any(), // Replace with the actual schema
});

const checkAchRelationshipSchema = z.object({
  accountId: z.string(),
});

const achTransferSchema = z.object({
  accountId: z.string(),
  transferData: z.any(), // Replace with the actual schema
});

const initiateAchTransferSchema = z.object({
  accountId: z.string(),
  achRelationshipData: z.any(), // Replace with the actual schema
  amount: z.string(),
});

const contactSchema = z.object({
  email_address: z.string(),
  phone_number: z.string(),
  street_address: z.array(z.string()),
  unit: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
});

const identitySchema = z.object({
  tax_id_type: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  date_of_birth: z.string(),
  tax_id: z.string(),
  country_of_citizenship: z.string(),
  country_of_birth: z.string(),
  country_of_tax_residence: z.string(),
  funding_source: z.array(z.string()),
});

const disclosuresSchema = z.object({
  is_control_person: z.boolean(),
  is_affiliated_exchange_or_finra: z.boolean(),
  is_politically_exposed: z.boolean(),
  immediate_family_exposed: z.boolean(),
});

const agreementsSchema = z.object({
  agreement: z.string(),
  signed_at: z.string(),
  ip_address: z.string(),
});

const alpacaCreateSchema = z.object({
  contact: contactSchema,
  identity: identitySchema,
  disclosures: disclosuresSchema,
  agreements: z.array(agreementsSchema),
  enabled_assets: z.array(z.string()),
});

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
    .input(z.object({ strategy: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.activeStrategies
        .upsert({
          where: {
            userId: ctx.session.user.id,
          },
          update: {
            strategyId: "congress_buys",
            amount: 1000,
          },
          create: {
            userId: ctx.session.user.id,
            alpacaid: ctx.session.user.alpacaId,
            amount: 1000,
            strategyId: "congress_buys",
          },
        })
        .then(async () => {
          const response = await fetch(
            `${process.env.API_URL}/rebalance?alpacaId=${ctx.session.user.alpacaId}`,
          );
          console.log(response);
          return "ok";
        });
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
