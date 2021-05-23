import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PosterLoader from "./PosterLoader";
import view from "../decor/view.svg";
import { useHistory } from "react-router";
import ModifyWatchlist from "./ModifyWatchlist";
import SuggestCover from "./SuggestCover";

function SuggestionList(props) {
  const history = useHistory();
  const { title, media_type, suggestedBy, tmdbID } = props.detail;

  const [loading, setLoading] = useState(true);

  const [by, setBy] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      const url = `/wtw/privateuser/${suggestedBy}`;

      await axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setBy(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };

    getInfo();
  }, [history, suggestedBy]);

  return (
    <div>
      {loading ? (
        <PosterLoader />
      ) : (
        <div className="res-row kindanav mr scroller-auto  scroller maxcontent">
          <div className="row center">
            <div className="user-circle">
              <h3>{by.username.charAt(0).toUpperCase()}</h3>
            </div>

            <h3>
              <span className="errmsg">{by.username} </span>
              Suggested You{" "}
              <a href={`/details?media=${media_type}&id=${tmdbID}`}>
                <i className="errmsg">{title} .</i>
              </a>
            </h3>
          </div>

          <div className="row mr center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="btn row mar-r"
              onClick={() =>
                history.push(`/details?media=${media_type}&id=${tmdbID}`)
              }
            >
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                src={view}
                alt="view"
                className="smallest-navs less-mr"
              ></motion.img>
              <h4 className="nomar">View</h4>
            </motion.button>
            <div className="mar-r">
              <ModifyWatchlist
                media_type={media_type}
                tmdbID={tmdbID}
                title={title}
              />
            </div>
            <SuggestCover
              media_type={media_type}
              tmdbID={tmdbID}
              title={title}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestionList;
