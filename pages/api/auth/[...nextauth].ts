import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "🥕",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  secret: env.NEXT_SECRET,
  callbacks: {
    async session({ session, user }) {
      // Récupérez les préférences de l'utilisateur à partir de la base de données
      const userPreferences = await prisma.userPreferences.findUnique({
        where: { userId: user.id },
      });

      // Créez un nouvel objet pour la session utilisateur
      const sessionUser = {
        ...session.user,
        id: user.id,
        image: user.image,
        role: user.role,
        preferences: userPreferences,
      };

      // Remplacez session.user par le nouvel objet
      session.user = sessionUser;

      return session;
    },
  },
};

export default NextAuth(authOptions);
