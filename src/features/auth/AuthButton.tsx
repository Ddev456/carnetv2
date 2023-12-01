import { getAuthSession } from "@/lib/auth";
import { LoggedInButton } from "./LoggedInButton";
import { RedirectToLogin } from "./RedirectToLogin";

export type AuthButtonProps = {};

export const AuthButton = async (props: AuthButtonProps) => {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    // return <LoginButton />;
    return <RedirectToLogin />;
  }

  // return <LoggedInButton user={user} />;
};
