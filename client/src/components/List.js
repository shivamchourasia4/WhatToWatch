import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import left from "../decor/left.svg";
import right from "../decor/right.svg";
import image from "../decor/file-image.svg";
import carrow from "../decor/circle-arrow.svg";
import { motion, AnimatePresence } from "framer-motion";
import play from "../decor/play-black.svg";
import { connect } from "react-redux";
import { setTrailer } from "../redux";
import axios from "axios";
import PosterLoader from "./PosterLoader";
import ModifyWatchlist from "./ModifyWatchlist";
import SuggestCover from "./SuggestCover";

function List(props) {
  const history = useHistory();
  const { movies } = props;
  const [pos, setpos] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const [hov, setHov] = useState(false);
  const [loading, setLoading] = useState(true);

  const posleft = () => {
    if (pos > 0) {
      paginate(-1);
      setLoading(true);
    }
  };

  const posright = () => {
    if (pos < movies.length - 1) {
      paginate(1);
      setLoading(true);
    }
  };

  const variants = {
    enter: (direction) => {
      return { x: direction > 0 ? 1000 : -1000, opacity: 0 };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    Promise.resolve()
      .then(() => setPage([page + newDirection, newDirection]))
      .then(() => setpos(pos + newDirection));
  };

  const getTrailer = async (media, id) => {
    const url = `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`;
    await axios
      .get(url)
      .then((res) => {
        if (res.data.results.length > 0) {
          props.setEmbedd(res.data.results[0].key);
        } else {
          alert("Trailer Unavailable!!");
        }
      })
      .catch(() => {
        alert("An Error Occured!");
      });
  };

  return (
    <div className="card center">
      {pos > 0 ? (
        <div className="arrow left">
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
            className="navs"
            onClick={() => posleft()}
          ></motion.img>
        </div>
      ) : null}
      {pos < movies.length - 1 ? (
        <div className="arrow right">
          <motion.img
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            whileHover={{
              scale: 1,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            src={right}
            alt="next"
            className="navs"
            onClick={() => posright()}
          ></motion.img>
        </div>
      ) : null}
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={pos}
          variants={variants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              posright();
            } else if (swipe > swipeConfidenceThreshold) {
              posleft();
            }
          }}
          className="show-backdrop"
          style={{
            backgroundColor: "black",
            backgroundImage: `${
              movies[pos].backdrop_path
                ? `url(https://image.tmdb.org/t/p/w500/${movies[pos].backdrop_path})`
                : "black"
            }`,
            backgroundBlendMode: "screen",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="info-with-poster">
            <div
              className="center"
              style={{ padding: "2rem 0rem 1.5rem 2rem" }}
            >
              <div
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                className="now-center"
              >
                <div style={{ position: "relative" }}>
                  <div className="for-trailer-click center">
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
                          `/details?media=${props.mediaType}&id=${movies[pos].id}`
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
                          `/details?media=${props.mediaType}&id=${movies[pos].id}`
                        );
                      }}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      See More
                    </motion.h2>
                  </div>
                </div>
                {loading && (
                  <div className="row poster">
                    <PosterLoader />
                  </div>
                )}

                <motion.img
                  src={
                    movies[pos].poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movies[pos].poster_path}`
                      : image
                  }
                  alt="Poster"
                  className={loading ? "black-load" : "poster"}
                  animate={
                    hov
                      ? { filter: "brightness(40%)" }
                      : { filter: "brightness(100%)" }
                  }
                  onClick={() => {
                    history.push(
                      `/details?media=${props.mediaType}&id=${movies[pos].id}`
                    );
                  }}
                  onLoad={() => setLoading(false)}
                ></motion.img>
              </div>
            </div>
            <div className="info now-center">
              {movies[pos].title ? (
                <motion.h1
                  onClick={() => {
                    history.push(
                      `/details?media=${props.mediaType}&id=${movies[pos].id}`
                    );
                  }}
                  className="point"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {movies[pos].title}
                </motion.h1>
              ) : (
                <motion.h1
                  className="point"
                  onClick={() => {
                    history.push(
                      `/details?media=${props.mediaType}&id=${movies[pos].id}`
                    );
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {movies[pos].name}
                </motion.h1>
              )}
              <h3>{movies[pos].overview}</h3>
              <div className="res-content-row">
                <div>
                  <button
                    className="nomar"
                    onClick={() => {
                      getTrailer(movies[pos].media_type, movies[pos].id);
                    }}
                  >
                    <span className="row center">
                      <motion.img
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        src={play}
                        alt="play"
                        className="smallest-navs"
                      ></motion.img>
                      <span style={{ marginLeft: "5px" }}>Watch Trailer</span>
                    </span>
                  </button>
                </div>
                <ModifyWatchlist
                  media_type={movies[pos].media_type}
                  tmdbID={movies[pos].id}
                  title={movies[pos].title}
                />
                <SuggestCover
                  media_type={movies[pos].media_type}
                  tmdbID={movies[pos].id}
                  title={movies[pos].title}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialState: state.trailer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEmbedd: (val) => dispatch(setTrailer(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
