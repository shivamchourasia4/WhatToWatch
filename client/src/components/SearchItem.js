import React, { useState } from "react";
import { motion } from "framer-motion";
import image from "../decor/file-image.svg";
import { useHistory } from "react-router-dom";
import carrow from "../decor/circle-arrow.svg";
import PosterLoader from "./PosterLoader";
function SearchItem(props) {
  const history = useHistory();
  const [hov, setHov] = useState(false);
  const [loading, setLoading] = useState(true);

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
    <div className="mr col">
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
                history.push(`/details?media=${props.tab}&id=${props.data.id}`);
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
                history.push(`/details?media=${props.tab}&id=${props.data.id}`);
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
              props.data.poster_path
                ? `https://image.tmdb.org/t/p/w500/${props.data.poster_path}`
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
              history.push(`/details?media=${props.tab}&id=${props.data.id}`);
            }}
            onLoad={() => setLoading(false)}
          ></motion.img>
        </div>
      </div>
      <div className="textholder">
        {props.data.title ? (
          <motion.h3
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            className="point"
            onClick={() => {
              history.push(`/details?media=${props.tab}&id=${props.data.id}`);
            }}
          >
            {props.data.title}
          </motion.h3>
        ) : (
          <motion.h3
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            className="point"
            onClick={() => {
              history.push(`/details?media=${props.tab}&id=${props.data.id}`);
            }}
          >
            {props.data.name}
          </motion.h3>
        )}
      </div>
    </div>
  );
}

export default SearchItem;
