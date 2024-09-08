import React from "react";
import { RegisterButton } from "@/components/ui/register-button";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blur-url";

export function Hero({ headerImage }) {
  console.log(headerImage);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 py-20 gap-5 lg:h-screen items-center px-4 lg:px-16">
      <div className="flex flex-col gap-5 lg:gap-10 md:col-span-2">
        <div className="text-4xl xl:text-6xl font-bold">
          ShrimpHack &apos;24
        </div>
        <div className="flex flex-col text-2xl lg:text-3xl">
          <div className="font-semibold">19 - 20 October</div>
          <div className="text-xl lg:text-2xl">JALA HQ - Sahid</div>
        </div>
        <div className="flex flex-col gap-2">
          <RegisterButton />
        </div>
      </div>
      <div className="order-first md:order-last py-10 md:col-span-3">
        <Image
          src={headerImage?.fields.image[0].url}
          height={headerImage?.fields.image[0].height}
          width={headerImage?.fields.image[0].width}
          alt={"header shrimphack"}
          className="rounded-xl"
          blurDataURL={rgbDataURL(243, 249, 252)}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw"
          priority
        />
      </div>
    </div>
  );
}
