import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Rocket, Shovel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FAQValues = [
  {
    question: "Que signifie le mode 'démo' de l'application ?",
    answer:
      "Carnet Potager est une application web en cours de construction, elle est limitée dans ses fonctionnalités pour le moment.",
  },
  {
    question:
      "J'ai besoin d'aide, je souhaite faire un retour sur l'application ?",
    answer:
      "Il est possible de faire un 'feedback' dans la section prévue à cette effet sur la plateforme.",
  },
  {
    question: "L'application est-elle gratuite?",
    answer:
      "Elle n'intégre pour le moment aucune fonctionnalité payante et est encore en cours de construction.",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div className="m-auto my-8 flex max-w-6xl flex-col gap-4 px-6 lg:my-16 lg:flex-row xl:my-24 xl:gap-8">
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-6xl font-extrabold text-transparent">
            Gérer votre potager facilement en quelques clics
          </h1>
          <h2 className="text-2xl font-bold text-foreground">
            Carnet Potager est une plateforme où vous pouvez consulter des
            fiches techniques sur les plantes potagères, créer et consulter
            votre journal de bord.
          </h2>
          {/* <div className="flex items-center gap-8">
            <div className="flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <Avatar key={i} className="-mr-4">
                  <AvatarFallback>{i + 1}</AvatarFallback>
                  <AvatarImage src={`/images/review/${(i % 4) + 1}.png`} />
                </Avatar>
              ))}
            </div>
            <div className="flex flex-col gap-0.5 text-yellow-500 dark:text-yellow-400">
              <p className="whitespace-nowrap  font-extrabold">
                +500 teachers trust us.
              </p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={32} fill="currentColor" />
                ))}
              </div>
            </div>
          </div> */}
        </div>
        <div className="my-auto">
          <Image
            className="rounded-md shadow-xl shadow-borders"
            width="560"
            height="315"
            src="https://cdn.pixabay.com/photo/2022/04/04/07/58/seedlings-7110591_1280.jpg"
            alt="garden photo"
          />
        </div>
      </div>
      {/* VALUES */}
      <div className="bg-primary py-8 text-primary-foreground xl:py-16">
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:flex-row xl:gap-6">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <Shovel size={32} />
            <Typography variant="h3">Passion</Typography>
            <Typography variant="large">
              Application pensée par et pour les jardiniers amateurs
            </Typography>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <Rocket size={32} />
            <Typography variant="h3">Mode Démo</Typography>
            <Typography variant="large">
              Cette application est pour le moment en mode "démo" avant la mise
              en ligne de la version finale
            </Typography>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="my-8 flex flex-col items-center gap-4 lg:my-16 xl:my-24">
        <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-extrabold uppercase text-transparent">
          essayer maintenant
        </h2>
        <Link
          href="/explorer"
          className={cn(buttonVariants(), "px-6 py-8 text-xl font-bold")}
        >
          COMMENCER
        </Link>
      </div>
      {/* FAQ */}
      <div
        className="bg-secondary py-8 text-secondary-foreground xl:py-16"
        style={{
          // @ts-ignore
          "--border": "240 3.7% 25%",
        }}
      >
        <div className="m-auto flex max-w-5xl flex-col gap-3 px-6 xl:gap-6">
          <h2 className="text-4xl font-extrabold">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQValues.map((value, i) => (
              <AccordionItem value={i + value.question} key={i}>
                <AccordionTrigger className="text-xl">
                  {value.question}
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  {value.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
