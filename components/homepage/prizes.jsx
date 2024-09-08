import React from "react";

export function Prizes({ prizes }) {
  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
      id="prizes"
    >
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        Prizes
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-2 mx-auto py-6">
        {prizes ? (
          prizes.map((prize, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-4 text-center w-36 lg:w-40"
            >
              <div className="text-5xl">{prize.logo}</div>
              <div className="text-lg font-semibold">{prize.name}</div>
              {/* <div>{track.descriptions}</div> */}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
