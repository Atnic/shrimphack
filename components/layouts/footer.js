import React from "react";
import { JalaLogo } from "../icons/jala-logo";
import { FooterLink } from "../ui/footer-link";
import { useRouter } from "next/router";

import { LanguangeSelector } from "../navbar/language-selector";

import { socials, stores } from "@lib/menus/socials";

export function Footer({
  address,
  address_title,
  contact_title,
  contacts,
  contact_number,
  sections = [],
}) {
  const { locale, locales, asPath } = useRouter();
  const visibleSections = sections.filter((s) => !s.hide);
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white w-full pt-20 pb-10 text-jala-gray space-y-8">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 md:px-8 xl:px-5 items-center justify-between flex pb-10">
        {/*mobile */}
        <div className="w-full md:hidden space-y-8">
          <div className="space-y-4 px-4 md:px-0">
            <JalaLogo color="#0084F3" />
          </div>
          <div className="gap-8 w-full">
            {visibleSections
              ? visibleSections.map((s) => (
                  <div
                    className="space-y-2 float-left px-4 w-1/2 pb-6"
                    key={s.id}
                  >
                    <div className="font-medium text-base text-jala-dark-blue mb-2">
                      {s.title}
                    </div>
                    <ul className="space-y-2">
                      {s.links.filter((l) => !l.hide).length
                        ? s.links
                            .filter((l) => !l.hide)
                            .map((link) => (
                              <li
                                className="font-light text-base"
                                key={link.id}
                              >
                                <FooterLink href={link.href}>
                                  {link.label}
                                </FooterLink>
                              </li>
                            ))
                        : ""}
                    </ul>
                  </div>
                ))
              : ""}
            <div className="clear-left pb-4"></div>
            <div className="space-y-2 px-4 pb-4 col-span-2">
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-base mb-2">
                    {address_title}
                  </div>
                  <div className="space-y-1 font-light">
                    <span className="whitespace-pre">{address}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-2 px-4 col-span-2">
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-base mb-2">
                    {contact_title}
                  </div>
                  <ul className="space-y-1">
                    {contacts.map((c) => (
                      <li className="font-light text-base" key={c.id}>
                        {`${c.icon} ${c.contact_number} (${c.title})`}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="md:grid md:grid-flow-col px-4 flex gap-4 md:gap-2 items-center py-4">
              {socials.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  className="hover:opacity-75"
                  aria-label={"social link " + item.name}
                >
                  <item.icon aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="px-4 col-span-2 grid grid-cols-1 gap-2 pt-4">
              {stores.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={"store link " + item.name}
                >
                  <item.icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/*big screen */}
        <div className="md:w-full md:block hidden">
          <div className="space-y-4 float-left md:w-3/12 lg:w-4/12 md:pr-2 lg:pr-32">
            <div className="mb-10">
              <JalaLogo color="#0084F3" />
            </div>
            <ul className="md:block hidden">
              <li>
                <div className="font-medium text-base mb-2 text-jala-dark-blue">
                  {address_title}
                </div>
                <div className="font-light text-sm">
                  <span className="whitespace-pre">{address}</span>
                </div>
              </li>
            </ul>
            <ul className="space-y-4 md:block hidden border-b border-slate-200 pb-4">
              <li>
                <div className="font-medium text-base mb-2 text-jala-dark-blue">
                  {contact_title}
                </div>
                <ul className="space-y-2">
                  {contacts
                    ? contacts.map((c) => (
                        <li className="font-light text-sm" key={c.id}>
                          {`${c.icon} ${c.contact_number} (${c.title})`}
                        </li>
                      ))
                    : ""}
                </ul>
              </li>
            </ul>
            <div className="md:grid md:grid-flow-col flex gap-4 md:gap-2 items-center pb-4">
              {socials.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  className="hover:opacity-75"
                  aria-label={"social link " + item.name}
                >
                  <item.icon aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="hidden md:grid grid-cols-1 w-fit gap-2">
              {stores.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="hover:opacity-70"
                  aria-label={"store link " + item.name}
                >
                  <item.icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {visibleSections.length
            ? visibleSections.map((s, index) => (
                <div
                  className={`space-y-2 ${
                    index % 6 > 2 ? "float-right" : "float-left"
                  } pb-4 pl-16 lg:pl-0 md:w-1/4 ${
                    visibleSections.length > 3 ? "lg:w-1/6" : "lg:w-[22%]"
                  }`}
                  key={s.id}
                >
                  <div className="font-medium text-base text-jala-dark-blue">
                    {s.title}
                  </div>
                  <div className="py-1 mr-12">
                    <hr />
                  </div>
                  <ul className="space-y-3">
                    {s.links.filter((l) => !l.hide).length
                      ? s.links
                          .filter((l) => !l.hide)
                          .map((link) => (
                            <li className="font-light text-base" key={link.id}>
                              <FooterLink href={link.href}>
                                {link.label}
                              </FooterLink>
                            </li>
                          ))
                      : ""}
                  </ul>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="container max-w-5xl mx-auto items-center justify-between flex px-2 sm:px-4 border-t border-slate-200 py-4">
        <div>
          <LanguangeSelector
            locale={locale}
            locales={locales}
            asPath={asPath}
            positionClass={"-right-0 -top-28 shadow-lg"}
          />
        </div>
        <div className="text-xs sm:text-sm">
          © {currentYear} PT JALA Akuakultur Lestari Alamku
        </div>
      </div>
    </footer>
  );
}
