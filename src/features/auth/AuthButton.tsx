import { getAuthSession } from "@/lib/auth";
import { RedirectToLogin } from "./RedirectToLogin";

export const AuthButton = async () => {
  return <RedirectToLogin />;
};
