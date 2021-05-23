import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import share from "../decor/share-solid.svg";
import { connect } from "react-redux";
import { setSuggest } from "../redux";
import jwt_decode from "jwt-decode";

function SuggestCover(props) {
  const [notsigned, setNotSigned] = useState(false);

  const showConnections = () => {
    const id = jwt_decode(localStorage.getItem("wtwtoken")).id;
    const data = {
      userID: id,
      tmdbID: props.tmdbID,
      title: props.title,
      media_type: props.media_type,
    };

    props.setSuggestData(data);
  };

  useEffect(() => {
    if (localStorage.getItem("wtwtoken") == null) {
      setNotSigned(true);
    }
  }, []);

  return (
    <React.Fragment>
      {notsigned ? null : (
        <div>
          <button className="add-circle" onClick={showConnections}>
            <motion.img
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              src={share}
              alt="menu"
              className="smallest-navs"
            ></motion.img>
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    initialState: state.suggest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSuggestData: (val) => dispatch(setSuggest(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCover);
