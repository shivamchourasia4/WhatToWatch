import React from "react";
import { motion } from "framer-motion";

function PosterLoader() {
  const variant = {
    first: {
      transition: { staggerChildren: 0.1 },
    },
    last: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const loadingCircle = {
    first: {
      y: "0%",
    },
    last: {
      y: "100%",
    },
  };

  const transition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  return (
    <div className="loader-cover-small">
      <div className="center">
        <motion.div
          variants={variant}
          initial="first"
          animate="last"
          transition={transition}
          className="row"
        >
          <motion.div
            className="circle"
            variants={loadingCircle}
            transition={transition}
          ></motion.div>

          <motion.div
            className="circle"
            variants={loadingCircle}
            transition={transition}
          ></motion.div>

          <motion.div
            className="circle"
            variants={loadingCircle}
            transition={transition}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default PosterLoader;
