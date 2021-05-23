import React from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";
import PeopleContainer from "./PeopleContainer";

function ShowPeople(props) {
  return (
    <div>
      <AnimatePresence>
        {props.peopleData && props.peopleData.loadSuggest ? (
          <PeopleContainer />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    peopleData: state.suggest,
  };
};

export default connect(mapStateToProps)(ShowPeople);
