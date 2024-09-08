import React from "react";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blur-url";

export function Galleries({ images }) {
  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 mx-auto lg:px-16 px-4"
      id="galleries"
    >
      <div className="text-4xl font-bold mx-auto text-center">
        ShrimpHack Photos
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mx-auto py-6">
        {images ? (
          images[0].fields.image.map((image, i) => (
            <div
              key={i}
              className="rounded-lg max-w-[45rem] max-h-[9rem] md:max-h-[13rem] lg:max-h-[15rem] xl:max-h-[20rem] overflow-hidden object-cover"
            >
              <Image
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 object-cover"
                src={image.url}
                alt={image.filename}
                height={image.thumbnails.large.height}
                width={image.thumbnails.large.width}
                blurDataURL={rgbDataURL(243, 249, 252)}
                placeholder="blur"
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
