import React from "react";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blur-url";

export function Prizes({ prizes, prizeImage }) {
  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
      id="prizes"
    >
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        Prizes
      </div>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center scroll-mt-10 content-center py-2">
        <Image
          unoptimized
          src={prizeImage?.fields.image[0].url}
          height={prizeImage?.fields.image[0].height}
          width={prizeImage?.fields.image[0].width}
          alt={"header shrimphack"}
          blurDataURL={rgbDataURL(243, 249, 252)}
          placeholder="blur"
          className="rounded-xl"
        />
        <div className="flex flex-col gap-2 py-6">
          {prizes ? (
            prizes.map((prize, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-4 py-2 text-center w-full"
              >
                <div className="text-3xl">{prize.logo}</div>
                <div className="text-lg font-semibold">{prize.name}</div>
                {/* <div>{track.descriptions}</div> */}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
