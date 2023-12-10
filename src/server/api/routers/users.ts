import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

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

const trustedContactSchema = z.object({
  given_name: z.string(),
  family_name: z.string(),
  email_address: z.string(),
});

const agreementsSchema = z.object({
  agreement: z.string(),
  signed_at: z.string(),
  ip_address: z.string(),
  revision: z.string(),
});

const alpacaCreateSchema = z.object({
  contact: contactSchema,
  identity: identitySchema,
  disclosures: disclosuresSchema,
  trusted_contact: trustedContactSchema,
  agreements: z.array(agreementsSchema),
  enabled_assets: z.array(z.string()),
});

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
  alpacaCreate: publicProcedure
    .input(alpacaCreateSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(
          "https://broker-api.sandbox.alpaca.markets/v1/accounts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiM2EwYzA3MTktZjY0Zi00MGQ5LWE5OTYtMDUxNzkzZTdhODkwIiwidXNlcl9pZCI6IjI1MDY5MmIxLTM3ZjMtNGEzMS1iZTAwLTk5MjcyYTg1ZjYxNiIsIm93bmVyX2lkIjoiIiwiZW1haWwiOiJ3dGdvbGRlbjVAZ21haWwuY29tIiwiY29ycmVzcG9uZGVudCI6IjE3ckoiLCJpc3MiOiJhbHBhY2EubWFya2V0cyIsImV4cCI6MTcwMjIzNjcwMSwibmJmIjoxNzAyMjM1NTAxLCJpYXQiOjE3MDIyMzU1MDF9.AePMRsWsp5qKJ5oncyR1oNbvczIslmBdkLicgj_jyQzGKk9JgqT4OFYJ3YEqiUgKUhuwV4hWqxKWRf78hxUL_pq-APj4ktHJv0hXGYs-mlB51XVRh0O-i6QFqLF18GVhnY4ukb2xAM40iE5OMrv8_MBXuRmfdH17vicJZhFbHDvO5mup",
            },
            body: JSON.stringify(input),
          },
        );

        console.log("response", response);
        if (!response.ok) {
          throw new Error("Failed to create account with Alpaca");
        }

        return await response.json();
      } catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
          return error.message;
        }
        // If it's not an Error instance, handle it as an unknown error
        return "An unknown error occurred";
      }
    }),
});
