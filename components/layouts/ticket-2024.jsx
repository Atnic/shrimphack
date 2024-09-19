import React, { useEffect } from "react";
import { SHMono } from "@/components/logo/shlogo";

export function Ticket2024({ account, session }) {
  useEffect(() => {
    if (account) {
      const ticket = document.getElementById("ticket");
      const { x, y, width, height } = ticket.getBoundingClientRect();
      const centerPoint = { x: x + width / 2, y: y + height / 2 };
      window.addEventListener("mousemove", (e) => {
        const degreeX = (e.clientY - centerPoint.y) * 0.008;
        const degreeY = (e.clientX - centerPoint.x) * -0.008;

        ticket.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
      });
    }
  }, [account]);

  // from-[#1d8edf] to-[#1D77DF]

  const name = account?.fields.name || session?.user?.name;
  const nameSplit = name.split(" ");

  return (
    <div className="flex flex-col mx-auto pt-28 pb-20 gap-5 items-center px-4 md:px-16  ">
      <div
        id="ticket"
        className="scroll-mt-20 relative overflow-hidden flex flex-col border-2 w-[21rem] rounded-3xl bg-gradient-to-br from-white to-slate-100 "
      >
        <div className="absolute z-10 w-20 h-6 border-slate-200 border-2 bg-white rounded-full top-[0.8rem] right-[7.5rem]"></div>
        <div className="absolute w-full h-full z-0">
          <ShrimpBack
            className="absolute right-[6rem] -top-[5rem] fill-blue-100"
            transform={"rotate(200) scale(0.5)"}
          />
          <ShrimpBack
            className="absolute -right-10 top-10 fill-blue-100 z-0"
            transform={"rotate(100) scale(0.5)"}
          />
          <ShrimpBack
            className="absolute -left-[4.5rem] top-12 fill-blue-100 z-0"
            transform={"rotate(180) scale(0.5)"}
          />
          <ShrimpBack
            className="absolute -left-[5rem] bottom-[5rem] fill-blue-100"
            transform={"rotate(0) scale(0.4)"}
          />
          <ShrimpBack
            className="absolute -right-12 bottom-[6rem] fill-blue-100"
            transform={"rotate(50) scale(0.5)"}
          />
          <ShrimpBack
            className="absolute right-[6rem] bottom-6 fill-blue-100"
            transform={"rotate(70) scale(0.5)"}
          />
          <ShrimpBack
            className="absolute left-[2.5rem] bottom-[16rem] fill-blue-100"
            transform={"rotate(0) scale(0.5)"}
          />
          <ShrimpBack
            className="absolute right-[3rem] bottom-[13rem] fill-blue-100"
            transform={"rotate(150) scale(0.5)"}
          />
        </div>
        <div className="relative flex flex-col justify-between h-[28rem]  px-10 py-10  text-black items-center">
          <div className="z-10 flex flex-col text-center justify-center">
            <div className="w-full flex justify-center">
              <SHMono width={160} height={80} fill={"#000"} />
            </div>

            <div className="flex flex-row gap-4 items-center z-10">
              <div className="flex flex-col ">
                <div className="text-sm font-medium">
                  JALA HQ &bull; 19 - 20 October, 2024
                </div>
                {/* <div className="text-sm inline-flex">
                Hosted by{" "}
                <span className="ml-2">
                  <JalaLogo width={50} height={20} />
                </span>
              </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 z-10 text-center">
            <div className="text-5xl font-extrabold uppercase text-jala-insight ">
              {nameSplit[0]}
            </div>
            <div className="text-4xl font-semibold uppercase text-jala-insight">
              {nameSplit[1]} {nameSplit[2]}
            </div>
            <div className="text-sm font-light">
              /{account?.fields.email || session?.user?.email}
            </div>
          </div>
          <div className="text-sm font-light">www.shrimphack.com</div>
        </div>
        <div className="flex flex-col justify-center p-6 bg-jala-insight text-white rounded-b-2xl border-jala-insight border-2 z-10">
          <div className="text-5xl text-center font-extrabold uppercase ">
            {account?.fields.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShrimpBack({ fill, transform, className }) {
  return (
    <svg
      width="163"
      height="150"
      viewBox="0 0 163 150"
      fill={fill}
      transform={transform}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63.0848 143.655L64.1834 142.825C70.3937 138.136 74.814 131.462 76.7073 123.914C78.6009 116.365 77.8548 108.397 74.5935 101.331C70.4964 92.4017 70.9461 82.0464 75.8019 73.5069C80.6584 64.9667 89.3282 59.2858 99.0958 58.2429C108.864 57.1994 118.538 60.9208 125.088 68.243L125.209 68.4024L125.208 68.4016C129.963 73.7853 137.087 76.4461 144.205 75.497C151.325 74.5473 157.502 70.1125 160.678 63.6711C163.854 57.2297 163.612 49.6291 160.032 43.4031L159.797 43.0929C153.29 31.9592 144.352 22.4414 133.649 15.2475C122.946 8.05367 110.757 3.37167 97.9916 1.5511C97.4454 1.39732 96.8806 1.31874 96.3132 1.31755C74.3459 -1.4096 52.1747 4.48159 34.4597 17.7514C16.7424 31.0229 4.85702 50.6428 1.2997 72.4914C-2.25834 94.3402 2.78789 116.719 15.3785 134.926L15.6637 135.303L15.727 135.387C20.9458 142.718 28.8438 147.697 37.7084 149.245C46.5729 150.793 55.6914 148.786 63.0858 143.658L63.0848 143.655ZM26.7139 127.267L26.6759 127.216L26.5682 127.074C17.6631 114.198 13.2171 98.7591 13.9136 83.1194L37.699 86.4442C39.5136 86.739 41.3703 86.2893 42.8498 85.1975C44.3292 84.1059 45.306 82.4647 45.5594 80.6431C45.8127 78.8227 45.3213 76.9758 44.1961 75.5218C43.0709 74.0677 41.4067 73.1287 39.5806 72.9169L15.805 69.5861C19.1367 55.5652 26.6184 42.8746 37.2718 33.1712L50.2028 50.2824C51.6742 52.2295 54.0729 53.2434 56.4943 52.9433C58.9163 52.6424 60.9937 51.0725 61.9445 48.8246C62.8943 46.5772 62.5738 43.9928 61.1024 42.0457L48.1777 24.9428C60.2964 17.4651 74.3693 13.7687 88.5998 14.325L87.1394 24.82C86.8439 26.6351 87.2936 28.4918 88.3853 29.9713C89.477 31.4508 91.1182 32.4275 92.9398 32.6809C94.7609 32.9336 96.607 32.4428 98.061 31.3177C99.5151 30.1925 100.454 28.5282 100.666 26.7022L102.12 16.1462C118.578 19.903 133.181 29.351 143.354 42.8228C145.088 45.1133 146.684 47.505 148.135 49.9853L148.299 50.2033C149.595 52.4739 149.681 55.2399 148.528 57.5859C147.375 59.9332 145.133 61.5552 142.544 61.9167C139.954 62.2781 137.354 61.3316 135.603 59.3899L135.501 59.2557C128.478 51.3117 118.833 46.1582 108.326 44.7362C97.819 43.3124 87.1507 45.7152 78.2682 51.5042C69.3854 57.2934 62.8807 66.0836 59.9396 76.2722C56.9995 86.459 57.8212 97.3637 62.2527 106.995C65.381 113.278 65.0762 120.723 61.4437 126.727C57.8111 132.731 51.3582 136.458 44.3428 136.603C37.3261 136.748 30.7246 133.291 26.8476 127.442L26.7146 127.266L26.7139 127.267Z"
        fill={fill}
      />
    </svg>
  );
}
