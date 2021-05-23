import React from "react";
import collapse from "../decor/collapse.svg";
import { connect } from "react-redux";
import { setVisiblePeople } from "../redux";
import { motion } from "framer-motion";
import PeopleCover from "./PeopleCover";

function PeopleContainer(props) {
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
        className="suggest-inner scroller"
      >
        <PeopleCover reqData={props.suggestData} />
      </motion.div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    suggestData: state.suggest.suggestData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVisible: () => dispatch(setVisiblePeople()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer);
