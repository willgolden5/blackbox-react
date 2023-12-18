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

// const trustedContactSchema = z.object({
//   given_name: z.string(),
//   family_name: z.string(),
//   email_address: z.string(),
// });

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
        alpaca: alpacaCreateSchema,
        internal: z.object({
          name: z.string(),
          password: z.string(),
          email: z.string(),
          phone: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { alpaca, internal } = input;
      let error = null;
      const hashPass = bcrypt.hashSync(internal.password, 10);
      await ctx.db.user
        .create({
          data: {
            name: internal.name,
            password: hashPass,
            email: internal.email,
            phone: internal.phone,
          },
        })
        .catch((err) => (error = err));

      if (error) {
        return "user already exists";
      } else {
        try {
          const response = await fetch(
            `${process.env.API_URL}/create-account`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                createAccountDto: alpaca,
              }),
            },
          );

          if (!response.ok) {
            return "alpaca create error";
          }

          const alpacaResponse = await response.json();
          await ctx.db.user.update({
            where: {
              email: internal.email,
            },
            data: {
              alpacaId: alpacaResponse.id,
            },
          });

          return "account created successfully";
        } catch (error) {
          // Check if the error is an instance of Error
          if (error instanceof Error) {
            return error.message;
          }
          // If it's not an Error instance, handle it as an unknown error
          return "An unknown error occurred";
        }
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

  trade: protectedProcedure.input(tradeSchema).mutation(async ({ input }) => {
    const response = await fetch(`${process.env.API_URL}/trade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Error in trade");
    }

    return response.json();
  }),
  createACHRelationship: publicProcedure
    .input(achRelationshipSchema)
    .mutation(async ({ input }) => {
      const response = await fetch(
        `${process.env.API_URL}/create-ach-relationship`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        },
      );

      if (!response.ok) {
        throw new Error("Error in create ACH relationship");
      }

      return response.json();
    }),

  checkACHRelationship: publicProcedure
    .input(checkAchRelationshipSchema)
    .mutation(async ({ input }) => {
      const response = await fetch(
        `${process.env.API_URL}/check-ach-relationship`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        },
      );

      if (!response.ok) {
        throw new Error("Error in check ACH relationship");
      }

      return response.json();
    }),

  createACHTransfer: publicProcedure
    .input(achTransferSchema)
    .mutation(async ({ input }) => {
      const response = await fetch(
        `${process.env.API_URL}/create-ach-transfer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        },
      );

      if (!response.ok) {
        throw new Error("Error in create ACH transfer");
      }

      return response.json();
    }),

  initiateACHTransfer: publicProcedure
    .input(initiateAchTransferSchema)
    .mutation(async ({ input }) => {
      const response = await fetch(`${process.env.API_URL}/ach-transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Error in initiate ACH transfer");
      }

      return response.json();
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
});
