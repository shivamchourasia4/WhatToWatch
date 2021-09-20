import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Loader from "./Loader";
import WatchlistItem from "./WatchlistItem";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
function WatchlistContent() {
  const [loading, setLoading] = useState(true);
  const [watchlistData, setWatchlistData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getresource = () => {
      const id = jwt_decode(localStorage.getItem("wtwtoken")).id;

      const url = `/wtw/watchlist/${id}`;

      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setLoading(false);
          setWatchlistData(res.data);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };
    getresource();
  }, [history]);

  const variants = {
    enter: { x: "-100%" },
    center: {
      x: 0,
    },
    exit: {
      x: "100%",
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      className="join-cover"
    >
      <div className="center">
        <div className="optn nomar">
          <h1 className="mr">Your Watchlist</h1>
          <div className="outline"></div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {watchlistData.length === 0 ? (
            <div className="col center">
              <h1 className="errmsg">Watchlist Empty !</h1>
              <h2 className="errmsg">
                Start Adding Movies/Tv Shows In Your Watchlist To View Them
                Later.{" "}
              </h2>
            </div>
          ) : (
            <div className="search-list center mr">
              {watchlistData.map((content) => {
                return (
                  <WatchlistItem
                    key={content._id}
                    media_type={content.media_type}
                    tmdbID={content.tmdbID}
                  />
                );
              })}
            </div>
          )}
        </React.Fragment>
      )}
    </motion.div>
  );
}

export default WatchlistContent;
