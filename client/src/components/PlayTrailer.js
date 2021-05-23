import { motion } from "framer-motion";
import React from "react";
import collapse from "../decor/collapse.svg";
import { connect } from "react-redux";
import { setVisible } from "../redux";

function PlayTrailer(props) {
  const variants = {
    enter: () => {
      return { x: -1000, opacity: 0 };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: () => {
      return {
        zIndex: 0,
        x: 1000,
        opacity: 0,
      };
    },
  };

  return (
    <div className="trailer-cover">
      <motion.img
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.1 },
        }}
        whileTap={{ scale: 0.9 }}
        src={collapse}
        alt="menu"
        className="navs collapse"
        onClick={() => props.setVisible()}
      ></motion.img>
      <motion.div
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="trailer-inner"
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${props.embedd}`}
          title="trailer"
        ></iframe>
      </motion.div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    embedd: state.trailer.embedd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVisible: () => dispatch(setVisible()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayTrailer);
