import React from "react";
import { InstagramLogo } from "../logo/social-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-row justify-between p-8 lg:px-16 items-center">
      <div className="font-light">Copyright © {currentYear} ShimpHack</div>
      <div>
        <a
          href="https://instagram.com/lifeatjala"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramLogo
            width={30}
            height={30}
            fill={"white"}
            aria-label={"Instagram Life at Jala"}
          />
        </a>
      </div>
    </div>
  );
}
