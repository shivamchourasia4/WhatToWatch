import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PosterLoader from "./PosterLoader";
import send from "../decor/paper-plane-solid.svg";
import confirm from "../decor/check-solid.svg";
import { useHistory } from "react-router";

function SuggestApply(props) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [suggested, setSuggested] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getInfo = async (id) => {
      const url = `/wtw/privateuser/${id}`;

      await axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };

    getInfo(props.user);
  }, [history, props.user]);

  const setSuggest = async () => {
    axios
      .post(
        `/wtw/suggest/id=${props.user}`,
        {
          title: props.reqData.title,
          tmdbID: props.reqData.tmdbID,
          media_type: props.reqData.media_type,
          suggestedTo: props.reqData.userID,
          suggestedBy: props.user,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        }
      )
      .then((res) => {
        setSuggested(true);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          localStorage.removeItem("wtwtoken");
          history.push("/login");
        }
      });
  };

  return (
    <div className="mr">
      {loading ? (
        <PosterLoader />
      ) : (
        <div className="row user-container kindanav center scroller-auto  scroller media-suggest">
          <div className="row center mr">
            <div className="user-circle">
              <h3>{info.firstname.charAt(0).toUpperCase()}</h3>
            </div>
            <h3>
              <span className="errmsg">{info.username} </span>
            </h3>
          </div>
          {suggested ? (
            <button className="row mar-r greenback">
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                src={confirm}
                alt="menu"
                className="smallest-navs less-mr"
              ></motion.img>
              <h4 className="nomar">Suggested</h4>
            </button>
          ) : (
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="btn row mr"
              onClick={setSuggest}
            >
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                src={send}
                alt="menu"
                className="smallest-navs less-mr"
              ></motion.img>
              <h4 className="nomar">Suggest</h4>
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestApply;
