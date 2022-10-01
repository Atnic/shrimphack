import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { motion, usePresence } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

export const PageContent = ({ children }) => {
  return <div>{children}</div>;
};
