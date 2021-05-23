import { AnimatePresence } from "framer-motion";
import React from "react";
import { connect } from "react-redux";
import PlayTrailer from "./PlayTrailer";

function TrailerCover(props) {
  return (
    <div>
      <AnimatePresence>
        {props.trailerData && props.trailerData.loadTrailer ? (
          <PlayTrailer />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    trailerData: state.trailer,
  };
};

export default connect(mapStateToProps)(TrailerCover);
