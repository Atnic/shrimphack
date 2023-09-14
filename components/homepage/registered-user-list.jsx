import React from "react";
import Image from "next/image";

export function RegisterUsersList({ registeredUsers, registered }) {
  // console.log(registeredUsers, registered);
  return (
    <>
      <div className="inline-flex">
        <div className="flex pt-2 -space-x-3 items-center">
          {registered?.records ? (
            registered?.records.slice(0, 8).map((member, i) => (
              <div
                key={i}
                className={
                  "border-slate-900 border-2 rounded-full w-10 h-10 overflow-hidden"
                }
                style={{ zIndex: i }}
              >
                <Image
                  src={
                    member.fields.image
                      ? member.fields.image[0]?.url
                      : member.fields.image_url || "/shlogo.jpg"
                  }
                  width={300}
                  height={300}
                  alt={member.fields.name}
                  className="bg-blue-100"
                />
              </div>
            ))
          ) : (
            <></>
          )}
          {registeredUsers >= 8 && (
            <div
              className="flex border-slate-900 border-2 rounded-full w-10 h-10 bg-red-500 text-white p-1 font-medium text-lg text-center items-center justify-center"
              style={{ zIndex: 9 }}
            >
              {registeredUsers - 8}
            </div>
          )}
        </div>
      </div>
      <div className="text-lg text-white font-semibold">
        {registeredUsers} Warga JALA Registered!!
      </div>
    </>
  );
}
