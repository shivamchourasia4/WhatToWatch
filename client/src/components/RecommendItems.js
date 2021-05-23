import { motion } from "framer-motion";
import React, { useState } from "react";
import image from "../decor/noback.svg";
import carrow from "../decor/circle-arrow.svg";
import { useHistory } from "react-router";

function RecommendItems({ movie, mediaType }) {
  const [hov, setHov] = useState(false);

  const history = useHistory();

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
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="now-center"
      >
        <div style={{ position: "relative" }}>
          <div className="for-rec-click center">
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
                history.push(`/details?media=${mediaType}&id=${movie.id}`);
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
                history.push(`/details?media=${mediaType}&id=${movie.id}`);
              }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2 }}
            >
              See More
            </motion.h2>
          </div>
        </div>
        <motion.img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
              : `${image}`
          }
          className={movie.backdrop_path ? "rec-back" : "rec-back noback"}
          alt="Poster"
          animate={
            hov ? { filter: "brightness(40%)" } : { filter: "brightness(100%)" }
          }
          onClick={() => {
            history.push(`/details?media=${mediaType}&id=${movie.id}`);
          }}
        ></motion.img>
      </div>
    </div>
  );
}

export default RecommendItems;
