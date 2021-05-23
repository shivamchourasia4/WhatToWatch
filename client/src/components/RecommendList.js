import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import right from "../decor/right.svg";
import left from "../decor/left.svg";
import { useHistory } from "react-router";
import RecommendItems from "./RecommendItems";

export default function RecommendList(props) {
  const [showleft, setLeft] = useState(false);
  const [showright, setRight] = useState(true);
  const [currscroll, setCurrentScroll] = useState(0);

  // const checkLeft = () => {
  //   var scroller = document.getElementById("tbscroll");
  //   if (scroller.scrollLeft === 0) {
  //     setLeft(false);
  //   } else {
  //     setLeft(true);
  //   }
  // };

  // const checkRight = () => {
  //   var scroller = document.getElementById("tbscroll");
  //   // console.log(scroller.scrollLeft);
  //   // console.log(scroller.clientLeft);
  //   if (
  //     scroller.scrollWidth ===
  //     Math.ceil(scroller.scrollLeft + scroller.clientWidth)
  //   ) {
  //     setRight(false);
  //   } else {
  //     setRight(true);
  //   }
  // };

  const history = useHistory();

  useEffect(() => {
    var scroller = document.getElementById("tbscroll");
    if (currscroll <= 0) {
      setLeft(false);
    } else {
      setLeft(true);
    }

    if (scroller.scrollWidth <= Math.ceil(currscroll + scroller.clientWidth)) {
      setRight(false);
    } else {
      setRight(true);
    }

    return () => {};
  }, [currscroll]);

  const setScroller = (tbp) => {
    // setCurrentScroll(document.getElementById("tbscroll").scrollLeft);
    setCurrentScroll(tbp);
  };

  const scrolright = (callback) => {
    // console.log(document.getElementById("tbscroll").scrollLeft);
    var tbp = (document.getElementById(
      "tbscroll"
    ).scrollLeft += document.getElementById("mark").clientWidth);
    callback(tbp);
  };
  const scrolleft = (callback) => {
    var tbp = (document.getElementById(
      "tbscroll"
    ).scrollLeft -= document.getElementById("mark").clientWidth);
    callback(tbp);
  };

  return (
    <div className="rec-container" id="mark">
      {showleft && (
        <div className="arrow rec-left">
          <motion.img
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            whileHover={{
              scale: 1,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            src={left}
            alt="prev"
            className="small-navs"
            onClick={() => scrolleft(setScroller)}
          ></motion.img>
        </div>
      )}
      {showright && (
        <div className="arrow rec-right">
          <motion.img
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            whileHover={{
              scale: 1,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            src={right}
            alt="prev"
            className="small-navs"
            onClick={() => scrolright(setScroller)}
          ></motion.img>
        </div>
      )}
      <div className="rec" id="tbscroll">
        {props.movies.map((movie, index) => {
          return (
            <div key={index}>
              {/* <motion.img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                    : `${image}`
                }
                className={
                  movie.backdrop_path ? "rec-back" : " rec-back noback"
                }
                whileTap={{ scale: 0.9 }}
                whileHover={{ opacity: 0.3 }}
                onClick={() => {
                  history.push(
                    `/details?media=${props.mediaType}&id=${movie.id}`
                  );
                }}
              ></motion.img> */}
              <RecommendItems movie={movie} mediaType={props.mediaType} />

              <div className="rec-title">
                {movie.title ? (
                  <motion.h3
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      history.push(
                        `/details?media=${props.mediaType}&id=${movie.id}`
                      );
                    }}
                  >
                    {movie.title}
                  </motion.h3>
                ) : (
                  <motion.h3
                    onClick={() => {
                      history.push(
                        `/details?media=${props.mediaType}&id=${movie.id}`
                      );
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {movie.name}
                  </motion.h3>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
