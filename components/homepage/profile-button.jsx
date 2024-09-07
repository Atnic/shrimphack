import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut, signIn } from "next-auth/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import LoginDialog from "./login-dialog";
import Link from "next/link";

export function ProfileButton({ account, session }) {
  const router = useRouter();
  // console.log(session, account);
  if (session && account) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="px-4 py-2 border-white border-2 text-white rounded-xl inline-flex items-center gap-2">
          Profile
          <div className="relative w-8 h-8 overflow-hidden">
            <Image
              src={
                account?.records[0]?.fields?.image
                  ? account?.records[0]?.fields?.image[0]?.url
                  : account?.records[0]?.fields?.image_url ||
                    session?.user?.image
              }
              layout="fill"
              objectFit="cover"
              alt={session?.user?.name}
              className="rounded-full bg-blue-100"
            />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-red-600 text-white font-semibold"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-3 `}
                    onClick={() => router.push("/2023")}
                  >
                    {active ? (
                      <UserCircleIcon
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <UserCircleIcon
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-red-600 text-white font-semibold"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-3`}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    {active ? (
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  if (session && !account) {
    return (
      <Link href={"/register"}>
        <div className="px-4 py-2 border-white border-2 text-white rounded-xl inline-flex text-sm md:text-base items-center gap-2">
          Complete Registration
        </div>
      </Link>
    );
  }

  if (!session) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="px-6 py-2 hover:border-blue-600 border-2 text-white hover:text-blue-600 hover:bg-white bg-blue-600 rounded-xl inline-flex items-center gap-2">
          Login
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-red-600 text-white font-semibold"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-3 `}
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    {active ? (
                      <AtSymbolIcon
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <AtSymbolIcon
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                    Login with JALA&apos;s email
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active, close }) => (
                  <LoginDialog active={active} close={close} />
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
  // return (
  //   <div>
  //     {session && account ? (
  //       <Menu as="div" className="relative inline-block text-left">
  //         <Menu.Button className="px-4 py-2 border-white border-2 text-white rounded-xl inline-flex items-center gap-2">
  //           Profile
  //           <Image
  //             src={
  //               account?.records[0]?.fields?.image
  //                 ? account?.records[0]?.fields?.image[0]?.url
  //                 : account?.records[0]?.fields?.image_url ||
  //                   session?.user?.image
  //             }
  //             width={30}
  //             height={30}
  //             alt={session?.user?.name}
  //             className="rounded-full bg-blue-100"
  //           />
  //         </Menu.Button>
  //         <Transition
  //           as={Fragment}
  //           enter="transition ease-out duration-100"
  //           enterFrom="transform opacity-0 scale-95"
  //           enterTo="transform opacity-100 scale-100"
  //           leave="transition ease-in duration-75"
  //           leaveFrom="transform opacity-100 scale-100"
  //           leaveTo="transform opacity-0 scale-95"
  //         >
  //           <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //             <div className="px-2 py-2 ">
  //               <Menu.Item>
  //                 {({ active }) => (
  //                   <button
  //                     className={`${
  //                       active
  //                         ? "bg-red-600 text-white font-semibold"
  //                         : "text-gray-900"
  //                     } group flex w-full items-center rounded-md px-2 py-3 `}
  //                     onClick={() => router.push("/2023")}
  //                   >
  //                     {active ? (
  //                       <UserCircleIcon
  //                         className="mr-2 h-6 w-6"
  //                         aria-hidden="true"
  //                       />
  //                     ) : (
  //                       <UserCircleIcon
  //                         className="mr-2 h-6 w-6"
  //                         aria-hidden="true"
  //                       />
  //                     )}
  //                     Profile
  //                   </button>
  //                 )}
  //               </Menu.Item>
  //               <Menu.Item>
  //                 {({ active }) => (
  //                   <button
  //                     className={`${
  //                       active
  //                         ? "bg-red-600 text-white font-semibold"
  //                         : "text-gray-900"
  //                     } group flex w-full items-center rounded-md px-2 py-3`}
  //                     onClick={() => signOut({ callbackUrl: "/" })}
  //                   >
  //                     {active ? (
  //                       <ArrowLeftOnRectangleIcon
  //                         className="mr-2 h-6 w-6"
  //                         aria-hidden="true"
  //                       />
  //                     ) : (
  //                       <ArrowLeftOnRectangleIcon
  //                         className="mr-2 h-6 w-6"
  //                         aria-hidden="true"
  //                       />
  //                     )}
  //                     Sign Out
  //                   </button>
  //                 )}
  //               </Menu.Item>
  //             </div>
  //           </Menu.Items>
  //         </Transition>
  //       </Menu>
  //     ) : (
  //       <Menu as="div" className="relative inline-block text-left">
  //         <Menu.Button className="px-4 py-2 border-white border-2 text-white rounded-xl inline-flex items-center gap-2">
  //           Login
  //         </Menu.Button>
  //         <Transition
  //           as={Fragment}
  //           enter="transition ease-out duration-100"
  //           enterFrom="transform opacity-0 scale-95"
  //           enterTo="transform opacity-100 scale-100"
  //           leave="transition ease-in duration-75"
  //           leaveFrom="transform opacity-100 scale-100"
  //           leaveTo="transform opacity-0 scale-95"
  //         >
  //           <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //             <div className="px-2 py-2 ">
  //               <Menu.Item>
  //                 {({ active }) => (
  //                   <button
  //                     className={`${
  //                       active
  //                         ? "bg-red-600 text-white font-semibold"
  //                         : "text-gray-900"
  //                     } group flex w-full items-center rounded-md px-2 py-3 `}
  //                     onClick={() => signIn("google", { callbackUrl: "/" })}
  //                   >
  //                     {active ? (
  //                       <AtSymbolIcon
  //                         className="mr-2 h-6 w-6"
  //                         aria-hidden="true"
  //                       />
  //                     ) : (
  //                       <AtSymbolIcon
  //                         className="mr-2 h-6 w-6"
  //                         aria-hidden="true"
  //                       />
  //                     )}
  //                     Login with JALA&apos;s email
  //                   </button>
  //                 )}
  //               </Menu.Item>
  //               <Menu.Item>
  //                 {({ active, close }) => (
  //                   <LoginDialog active={active} close={close} />
  //                 )}
  //               </Menu.Item>
  //             </div>
  //           </Menu.Items>
  //         </Transition>
  //       </Menu>
  //     )}
  //   </div>
  // );
}
