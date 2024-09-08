/* eslint-disable @next/next/no-img-element */
import React from "react";
import { rgbDataURL } from "@/utils/blur-url";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export function Galleries({ images }) {
  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 lg:px-16 px-4"
      id="galleries"
    >
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        ShrimpHack Photos
      </div>

      <Gallery>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mx-auto py-6 pswp-gallery">
          {images ? (
            images[0].fields.image.map((image, i) => (
              <Item
                original={image.url}
                thumbnail={image.thumbnails.small.url}
                height={image.thumbnails.large.height}
                width={image.thumbnails.large.width}
                key={i}
              >
                {({ ref, open }) => (
                  <div className="rounded-lg max-w-[45rem] max-h-[9rem] md:max-h-[13rem] lg:max-h-[15rem] xl:max-h-[20rem] overflow-hidden object-cover">
                    <img
                      ref={ref}
                      onClick={open}
                      className="transform rounded-xl brightness-90 transition will-change-auto group-hover:brightness-110 object-cover cursor-pointer"
                      src={image.url}
                      alt={image.filename}
                      height={image.thumbnails.large.height}
                      width={image.thumbnails.large.width}
                      placeholder="blur"
                    />
                  </div>
                )}
              </Item>
            ))
          ) : (
            <></>
          )}
        </div>
      </Gallery>
    </div>
  );
}
