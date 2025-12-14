import { motion } from "framer-motion";
import { ReactNode } from "react";

// Modern "App-like" slide and fade
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    filter: "blur(4px)"
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)"
  },
  out: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    filter: "blur(4px)"
  }
};

const pageTransition = {
  type: "tween",
  ease: "circOut",
  duration: 0.4
} as any;

export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};