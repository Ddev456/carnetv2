import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse];

// Vérifie que l'utilisateur est connecté
export const getAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);
  return session;
};

// Vérifie quel est l'utilisateur connecté
export const getRequiredAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  return session as {
    user: {
      id: string;
      email?: string;
      image?: string;
      name?: string;
      role?: string;
    };
  };
};
