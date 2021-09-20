import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import image from "../decor/file-image.svg";
import carrow from "../decor/circle-arrow.svg";
import PosterLoader from "./PosterLoader";
import ModifyWatchlist from "./ModifyWatchlist";
import SuggestCover from "./SuggestCover";

function WatchlistItem(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const history = useHistory();
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const getData = (media, id) => {
      const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch();
    };
    window.scrollTo(0, 0);
    setLoading(true);
    getData(props.media_type, props.tmdbID);
  }, [props.media_type, props.tmdbID]);

  const hovervariants = {
    show: {
      opacity: 1,
      x: 0,
    },
    nohoverl: {
      opacity: 0,
      x: -50,
    },
    nohoverr: {
      opacity: 0,
      x: 50,
    },
  };

  return (
    <div>
      {loading ? (
        <PosterLoader />
      ) : (
        <div className="col mr center">
          <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="now-center"
          >
            <div style={{ position: "relative" }}>
              <div className="for-rest-click center">
                <motion.img
                  whileTap={{ scale: 0.9 }}
                  variants={hovervariants}
                  initial="nohoverl"
                  animate={hov ? "show" : "nohoverl"}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: "0.25",
                  }}
                  src={carrow}
                  alt="menu"
                  className="navs dont-show"
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    history.push(
                      `/details?media=${props.media_type}&id=${props.tmdbID}`
                    );
                  }}
                ></motion.img>
                <motion.h2
                  variants={hovervariants}
                  initial="nohoverr"
                  animate={hov ? "show" : "nohoverr"}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: "0.25",
                  }}
                  className="dont-show point"
                  onClick={() => {
                    history.push(
                      `/details?media=${props.media_type}&id=${props.tmdbID}`
                    );
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.2 }}
                >
                  See More
                </motion.h2>
              </div>
            </div>
            {loading && <PosterLoader />}
            <div>
              <motion.img
                whileTap={{ scale: 0.9 }}
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                    : image
                }
                alt="Poster"
                className={loading ? "black-load" : "poster-rest"}
                animate={
                  hov
                    ? { filter: "brightness(40%)" }
                    : { filter: "brightness(100%)" }
                }
                onClick={() => {
                  history.push(
                    `/details?media=${props.media_type}&id=${props.tmdbID}`
                  );
                }}
                onLoad={() => setLoading(false)}
              ></motion.img>
            </div>
          </div>
          <div className="textholder">
            {data.title ? (
              <motion.h3
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.2 }}
                className="point"
                onClick={() => {
                  history.push(
                    `/details?media=${props.media_type}&id=${props.tmdbID}`
                  );
                }}
              >
                {data.title}
              </motion.h3>
            ) : (
              <motion.h3
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.2 }}
                className="point"
                onClick={() => {
                  history.push(
                    `/details?media=${props.media_type}&id=${props.tmdbID}`
                  );
                }}
              >
                {data.name}
              </motion.h3>
            )}
          </div>
          <div className="row">
            <div className="mar-r">
              <ModifyWatchlist
                media_type={props.media_type}
                tmdbID={props.tmdbID}
                title={data.title ? data.title : data.name}
              />
            </div>
            <SuggestCover
              media_type={props.media_type}
              tmdbID={props.tmdbID}
              title={data.title ? data.title : data.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchlistItem;
