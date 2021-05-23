import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import add from "../decor/bookmark-plus.svg";
import remove from "../decor/bookmark-dash.svg";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SmallLoader from "./SmallLoader";
import { useHistory } from "react-router";

function ModifyWatchlist(props) {
  const [loading, setLoading] = useState(true);
  const [isadded, setIsAdded] = useState(false);
  const [notsigned, setNotSigned] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const checkAdded = async () => {
      const id = jwt_decode(localStorage.getItem("wtwtoken")).id;
      const url = `/wtw/user/${id}`;

      await axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          res.data.watchlist.forEach((content) => {
            if (
              content.tmdbID === props.tmdbID.toString() &&
              content.media_type === props.media_type
            ) {
              setIsAdded(true);
            }
          });
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };
    if (localStorage.getItem("wtwtoken") == null) {
      setNotSigned(true);
    } else {
      checkAdded();
    }
  }, [history, props.media_type, props.tmdbID]);

  const addtoWatchlist = async () => {
    const id = jwt_decode(localStorage.getItem("wtwtoken")).id;
    setLoading(true);
    await axios
      .post(
        "/wtw/watchlist",
        {
          id: id,
          tmdbID: props.tmdbID,
          media_type: props.media_type,
          title: props.title,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        }
      )
      .then(() => {
        setIsAdded(true);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          localStorage.removeItem("wtwtoken");
          history.push("/login");
        }
      });
  };

  const removeFromWatchlist = async () => {
    const id = jwt_decode(localStorage.getItem("wtwtoken")).id;
    setLoading(true);
    await axios
      .delete("/wtw/watchlist", {
        headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        data: {
          id: id,
          tmdbID: props.tmdbID,
          media_type: props.media_type,
        },
      })
      .then(() => {
        setIsAdded(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          localStorage.removeItem("wtwtoken");
          history.push("/login");
        }
      });
  };

  return (
    <React.Fragment>
      {notsigned ? null : (
        <div>
          {loading ? (
            <SmallLoader />
          ) : (
            <div>
              {isadded ? (
                <button
                  className="add-circle redback"
                  onClick={removeFromWatchlist}
                >
                  <motion.img
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    src={remove}
                    alt="menu"
                    className="smallest-navs"
                  ></motion.img>
                </button>
              ) : (
                <button className="add-circle" onClick={addtoWatchlist}>
                  <motion.img
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    src={add}
                    alt="menu"
                    className="smallest-navs"
                  ></motion.img>
                </button>
              )}
            </div>
          )}
        </div>
      )}{" "}
    </React.Fragment>
  );
}

export default ModifyWatchlist;
