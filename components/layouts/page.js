import * as React from "react";

export const PageLayout = ({ children }) => {
  return (
    <section className="flex flex-col flex-1 min-h-screen scroll-smooth overflow-hidden bg-white text-slate-800">
      {children}
    </section>
  );
};
