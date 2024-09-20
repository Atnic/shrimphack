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
                  "border-jala-insight border-2 rounded-full w-10 h-10 overflow-hidden relative"
                }
                style={{ zIndex: i }}
              >
                <Image
                  src={
                    member.fields.image
                      ? member.fields.image[0]?.url
                      : member.fields.image_url || "/shlogo.jpg"
                  }
                  layout="fill"
                  objectFit="cover"
                  alt={member.fields.name}
                  className="bg-blue-100"
                />
              </div>
            ))
          ) : (
            <></>
          )}
          {registeredUsers > 8 && (
            <div
              className="flex border-jala-insight border-2 rounded-full w-10 h-10 bg-jala-insight text-white p-1 font-medium text-lg text-center items-center justify-center"
              style={{ zIndex: 9 }}
            >
              {registeredUsers - 8}
            </div>
          )}
        </div>
      </div>
      {registeredUsers > 0 && (
        <div className="text-lg text-slate-700 font-semibold">
          {registeredUsers} Warga JALA {registeredUsers > 1 ? "are" : "is"}{" "}
          Registered!!
        </div>
      )}
    </>
  );
}
