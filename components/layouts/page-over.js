import * as React from "react";

export const PageLayoutOver = ({ children }) => {
  return (
    <section className="flex flex-col flex-1 min-h-screen scroll-smooth">
      {children}
    </section>
  );
};
