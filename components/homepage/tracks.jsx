import React from "react";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blur-url";

export function Tracks({ tracks }) {
  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
      id="tracks"
    >
      <div className="text-4xl font-bold text-left border-b border-jala-insight border-dotted py-4">
        Tracks
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 mx-auto py-6">
        {tracks?.records ? (
          tracks?.records?.map((track, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 py-4 md:w-72 items-center"
            >
              <div className="max-w-[14rem] max-h-[10rem] lg:max-w-[18rem] lg:max-h-[18rem] overflow-hidden rounded-lg ">
                <Image
                  src={track.fields.image[0].url}
                  alt={track.fields.name}
                  height={track.fields.image[0].height}
                  width={track.fields.image[0].width}
                  blurDataURL={rgbDataURL(243, 249, 252)}
                  placeholder="blur"
                />
              </div>
              <div className="text-lg font-semibold text-center">
                {track.fields.name}
              </div>
              <div className="text-center">{track.fields.descriptions}</div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
