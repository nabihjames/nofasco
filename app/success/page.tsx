import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div className="flex flex-col p-16">
      <div className="flex flex-col justify-center items-center p-4 w-full">
        <div className="flex flex-col justify-center items-center w-fit">
          <img
            src="/assets/success.png"
            width={282.23}
            height={320}
            alt="Non items"
          />
        </div>
        <h1 className="m-3 font-medium text-2xl text-gray-800 py-5 text-center max-md:text-lg">
          Votre commande a été passée avec succès.
        </h1>
        <a href="/products">
          <Button className="bg-primaryui max-w-[282.23px] w-full m-2">
            Continuer à parcourir le site
          </Button>
        </a>
      </div>
    </div>
  );
}

export default page;
