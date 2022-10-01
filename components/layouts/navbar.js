import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ResponsivePopover } from "../navbar/responsive-popover";
import { LanguangeSelector } from "../navbar/language-selector";
import { NavPopover } from "@components/navbar/nav-popover";

import { navbarContent } from "../../lib/lang/navbar";

export function Navbar({ panels = [] }) {
  const { locale, locales, asPath } = useRouter();
  const { signin, contact_us, get_started } = navbarContent[locale];

  const visiblePanels = [...panels].filter((p) => !p.hide);
  const responsivePanels = [...visiblePanels];

  return (
    <header className="md:fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pb-5 pt-2 shadow-sm bg-white">
      {/* <div className="absolute inset-0 opacity-50"></div> */}
      <div className="mx-auto max-w-6xl items-center justify-end flex pb-1">
        <div>
          <LanguangeSelector
            locale={locale}
            locales={locales}
            asPath={asPath}
            positionClass={"right-0 mt-2"}
          />
        </div>
        {/* <Link href="https://jala.tech/contact">
          <a className="text-jala-gray hover:bg-jala-hover-bg hover:text-jala-primary rounded-full py-1 px-4 ml-2 font-normal text-sm">
            {contact_us}
          </a>
        </Link> */}
        <Link href="https://app.jala.tech/login">
          <a className="text-jala-gray hover:bg-jala-hover-bg hover:text-jala-primary rounded-full py-1 pl-4 lg:px-4 ml-2 font-normal text-sm">
            {signin}
          </a>
        </Link>
      </div>
      <nav className="mx-auto max-w-6xl items-center justify-between flex">
        <div className="flex flex-1 space-x-8 items-center">
          <div className="">
            <Link href="/">
              <a aria-label="jala tech logo">
                <JalaLogo aria-hidden="true" />
              </a>
            </Link>
          </div>
          <div className="hidden lg:inline-flex lg:flex-1 mx-auto space-x-0 xl:space-x-4">
            {visiblePanels.map((panel, index) => {
              if ("sections" in panel && panel.sections.length) {
                return (
                  <div key={`panel-${index}`}>
                    <NavPopover
                      title={panel.title}
                      categories={panel.sections.filter((s) => !s.hide)}
                      panelTransformClass={
                        ["-left-40", "-translate-x-1/3 left-1/3"][index]
                      }
                    />
                  </div>
                );
              } else if (panel.link) {
                return (
                  <Link key={`panel-${index}`} href={panel.link.href || ""}>
                    <a
                      target={panel.link.target}
                      className="text-jala-dark-blue text-base font-normal hover:text-jala-primary px-4 py-2 rounded-full hover:bg-jala-hover-bg "
                    >
                      {panel.link.label || panel.title}
                    </a>
                  </Link>
                );
              } else {
                return (
                  <span
                    key={`panel-${index}`}
                    className="text-jala-dark-blue text-base font-normal hover:text-jala-primary px-4 py-2 rounded-full hover:bg-jala-hover-bg "
                  >
                    {panel.title}
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 items-center justify-items-end lg:hidden">
          <ResponsivePopover
            signin={signin}
            signup={get_started}
            demo={contact_us}
            panels={responsivePanels}
          />
        </div>
        <div className="hidden lg:inline-flex items-center space-x-2 text-gray-700 text-base font-medium">
          <>
            <Link href="/contact-us">
              <a className="bg-jala-primary border-jala-primary hover:bg-white border-2 rounded-full py-2 px-4 text-white hover:text-jala-primary">
                {contact_us}
              </a>
            </Link>
            <Link href="https://app.jala.tech/register">
              <a className="text-jala-dark-blue hover:bg-jala-dark-blue hover:text-white rounded-full py-2 px-4 border-2 border-blue-500 hover:border-jala-dark-blue">
                {get_started}
              </a>
            </Link>
          </>
        </div>
      </nav>
    </header>
  );
}

function JalaLogo() {
  return (
    <svg
      width="106"
      height="29"
      viewBox="0 0 106 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9829 0.0748503C13.411 0.210242 12.8384 0.765764 12.6265 1.39083C12.5599 1.58713 12.5361 3.97716 12.5361 10.4686C12.5361 20.0233 12.5429 19.8546 12.1108 20.9416C11.2057 23.2177 8.95946 24.7611 6.55184 24.7611C5.36525 24.7611 4.36852 24.4542 3.37591 23.7832C2.73132 23.3475 2.30177 23.1927 1.74298 23.1949C0.719519 23.1989 0.00272795 23.9398 7.82863e-06 24.9963C-0.00146881 25.5831 0.205649 25.9589 0.874643 26.5837C1.73622 27.3884 2.96494 27.9615 4.55186 28.2989C5.16676 28.4296 5.62048 28.4683 6.55184 28.4696C7.94944 28.4715 8.83356 28.3356 10.0227 27.9362C11.5059 27.4379 12.477 26.851 13.5596 25.7982C15.2415 24.1627 16.0825 22.1688 16.3449 19.1949C16.4038 18.5275 16.4237 15.5277 16.4072 9.78726L16.3831 1.35955L16.1676 0.989669C15.9259 0.574947 15.4467 0.205067 14.9827 0.0750847C14.6255 -0.0249503 14.4044 -0.0250279 13.9829 0.0748503ZM35.2109 0.255948C34.8076 0.40114 34.5725 0.56844 34.3507 0.867917C34.1799 1.09856 23.2684 24.6134 22.8108 25.737C22.2021 27.2314 23.5249 28.7114 25.0655 28.2596C25.9176 28.0098 25.6257 28.5636 30.6719 17.6249C33.506 11.4816 35.3185 7.64262 35.4365 7.53334C35.6787 7.30896 35.9451 7.30896 36.1931 7.53334C36.3194 7.64764 37.9921 11.1886 40.9426 17.5878C45.3044 27.0478 45.5133 27.4812 45.8773 27.8295C47.1188 29.0169 49.1644 27.9801 48.9631 26.2656C48.9078 25.7941 37.5101 1.08923 37.1877 0.742089C36.7104 0.227959 35.8656 0.0202071 35.2109 0.255948ZM56.6155 0.239172C56.2105 0.377229 55.623 0.958702 55.4613 1.38134C55.3264 1.73397 55.3197 2.35268 55.3197 14.4519V27.1523L55.487 27.4659C55.697 27.8595 55.9408 28.0908 56.3092 28.2461C56.5626 28.3529 57.537 28.3672 64.4685 28.3657C71.9644 28.3641 72.355 28.3571 72.6571 28.2187C73.5348 27.8165 73.9691 26.805 73.6832 25.8286C73.557 25.398 72.9132 24.7485 72.4863 24.6213C72.2469 24.5499 70.6086 24.526 65.9736 24.526C59.3273 24.526 59.4564 24.5334 59.2468 24.1383C59.1929 24.0369 59.1667 20.3479 59.1667 12.8786C59.1667 4.67481 59.1432 1.69031 59.0765 1.46601C58.9586 1.06908 58.5318 0.572752 58.1309 0.366488C57.7566 0.173866 56.9946 0.109816 56.6155 0.239172ZM92.1968 0.242306C92.0471 0.292559 91.7536 0.511601 91.5444 0.728997C91.1895 1.09793 90.7816 1.95286 85.4463 13.5111C80.1138 25.0635 79.7265 25.9309 79.6973 26.3881C79.5883 28.0968 81.5961 28.9957 82.8472 27.7984C83.0379 27.6159 84.1681 25.2413 87.6947 17.6136C91.0391 10.3802 92.3489 7.62279 92.4965 7.50574C92.7133 7.33374 93.0764 7.34769 93.2609 7.53506C93.3131 7.58806 95.4156 12.0941 97.9332 17.5486C102.925 28.3633 102.719 27.9675 103.505 28.2377C103.981 28.4013 104.272 28.4013 104.748 28.2376C105.595 27.9467 106.154 26.9856 105.962 26.15C105.869 25.7431 94.654 1.4069 94.332 0.913073C93.9396 0.311139 92.9331 -0.00495929 92.1968 0.242306Z"
        fill="#0084F3"
      />
    </svg>
  );
}
