import React from "react";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blur-url";

export function About({ aboutImage }) {
  return (
    <div
      className="mx-auto grid grid-cols-1 md:grid-cols-2 py-20 gap-10 items-center scroll-mt-10 px-4 lg:px-16"
      id="about"
    >
      <div className="md:text-lg leading-relaxed w-auto">
        ShrimpHack is a competitive weekend-long internal event of JALA where
        WargaJALA come together to work on cool projects. You&apos;ll have the
        freedom to create a product, learn new techniques for your future work,
        or just have fun working on a project with friends. ShrimpHack wants to
        help JALA promote the inclusive collaborative work environment and drive
        the innovation culture.
      </div>
      <div className="">
        <Image
          src={aboutImage?.fields.image[0].url}
          height={aboutImage?.fields.image[0].height}
          width={aboutImage?.fields.image[0].width}
          alt={"header shrimphack"}
          blurDataURL={rgbDataURL(243, 249, 252)}
          placeholder="blur"
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
