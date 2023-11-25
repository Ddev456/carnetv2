import Image from "next/image";
import React from "react";

export const Tips = () => {
  return (
    <div className="dark:highlight-white/5 relative mx-auto flex max-w-2xl items-center gap-6 space-y-8 overflow-visible rounded-xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-slate-800">
      <Image
        className="absolute -left-6 h-24 w-24 rounded-full shadow-lg"
        src="https://cdn.pixabay.com/photo/2017/03/23/11/04/field-2168030_1280.jpg"
        alt="tip_image"
        width="100"
        height="100"
      />
      <div className="flex flex-col justify-between pb-8 pl-20">
        <div className="text-lg font-bold md:text-2xl">Solanaceae's family</div>
        <p className="md:text-md text-sm font-semibold">
          "La pomme de terre fait partie de la famille des solanacées tout comme
          la Tomate ou l'Aubergine"
        </p>
      </div>
    </div>
  );
};
