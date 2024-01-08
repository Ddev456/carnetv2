import { Plant } from "@prisma/client";
import React from "react";

type AdvicesProps = {
  plant: Plant;
};

export const Advices = ({ plant }: AdvicesProps) => {
  return (
    <div className="space-y-4 rounded-xl bg-secondary/40 p-4">
      <h4 className="text-xl">Conseils de culture & astuces</h4>
      {plant.advice.map((advice, index) => (
        <div
          key={index}
          className="rounded p-4 text-base text-foreground/80 shadow"
        >
          {advice}
        </div>
      ))}
    </div>
  );
};
