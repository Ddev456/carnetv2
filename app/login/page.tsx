import { GithubSignInButton } from "@/features/auth/GithubSignInButton";
import { GoogleSignInButton } from "@/features/auth/GoogleSignInButton";
import Image from "next/image";

export default async function LoginPage({}) {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative grid h-[800px] items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-1 lg:flex">
          <div className="absolute inset-0 bg-foreground" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Carnet Potager
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;L'application par et pour les jardiniers amateurs.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="xs:w-[250px] mx-auto flex flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="relative flex flex-col space-y-2 overflow-visible border-[1px] border-primary bg-white p-8 text-center">
              <Image
                className="absolute -z-10 translate-x-[15rem] translate-y-[-6rem] sm:translate-x-[24rem] sm:translate-y-[-5rem]"
                src="/logo_helper2.svg"
                alt="logo"
                width={80}
                height={80}
              />
              <Image
                className="absolute translate-x-[18rem] translate-y-[-3rem] sm:hidden"
                src="/Vector2.svg"
                alt="logo"
                width={10}
                height={10}
              />
              <Image
                className="absolute hidden sm:block sm:translate-x-[25rem] sm:translate-y-[-0.5rem]"
                src="/Vector.svg"
                alt="logo"
                width={30}
                height={30}
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                🥕 Carnet Potager
              </h1>
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour accèder à l'application
              </p>
              <GoogleSignInButton />
              <GithubSignInButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
