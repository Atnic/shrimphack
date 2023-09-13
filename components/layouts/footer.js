import React from "react";
import { InstagramLogo } from "../logo/social-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-row justify-between p-8 px-4 lg:px-16 items-center">
      <div className="font-light">Copyright © {currentYear} ShimpHack</div>
      <div className="flex items-center hover:-translate-y-1 delay-75">
        <a
          href="https://instagram.com/lifeatjala"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center"
        >
          <InstagramLogo
            width={30}
            height={30}
            fill={"white"}
            aria-label={"Instagram Life at Jala"}
          />
          lifeatjala
        </a>
      </div>
    </div>
  );
}
