import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
import { User as PrismaUser } from "@prisma/client";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      alpacaId: string;
      name: string;
      email: string;
      phone: string;
      isPaid: boolean;
      joinDate: Date;
    };
  }
}

function compareAsync(param1: string, param2: string) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      /* User table contents is exposed in tokens */
      if (user) {
        const fullUser = user as PrismaUser;
        token.id = user.id;
        token.alpacaId = fullUser.alpacaId;
        token.joinDate = fullUser.joinDate;
      }
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.alpacaId = token.alpacaId as string;
        session.user.joinDate = token.joinDate as Date;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password here",
        },
      },
      async authorize(credentials, req) {
        let { email, password } = credentials as Record<
          "email" | "password",
          string
        >;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          // Return null if user data could not be retrieved
          return null;
        }
        const isPasswordValid = await compareAsync(password, user.password);
        if (isPasswordValid === false) {
          return null;
        }
        console.log("User found", user);
        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: null, // If set, new users will be directed here on first sign in
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
