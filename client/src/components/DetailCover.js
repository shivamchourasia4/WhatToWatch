import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import image from "../decor/file-image.svg";
import Loader from "./Loader";
import { motion } from "framer-motion";
import Recommendations from "./Recommendations";
import { connect } from "react-redux";
import { setTrailer } from "../redux";
import play from "../decor/play-solid.svg";
import ModifyWatchlist from "./ModifyWatchlist";
import SuggestCover from "./SuggestCover";

function DetailCover(props) {
  var media = useQuery().get("media");
  var id = useQuery().get("id");

  const [back, setBack] = useState("");
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const getbackDrop = () => {
      const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setBack(res.data.backdrop_path);
          setDetail(res.data);
          setIsLoading(false);
        })
        .catch();
    };
    window.scrollTo(0, 0);
    setIsLoading(true);
    getbackDrop();
  }, [id, media]);

  const getTrailer = () => {
    const url = `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.results.length > 0) {
          props.setEmbedd(res.data.results[0].key);
        } else {
          alert("Trailer Unavailable!!");
        }
      })
      .catch(() => alert("An Error Occured!"));
  };

  const calDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dt = new Date(date);
    var year = dt.getFullYear();
    var month = dt.getMonth();
    var mn = monthNames[month];
    var dte = dt.getDate();

    return dte + " " + mn + " " + year;
  };

  const variants = {
    enter: { x: "-100%", opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "100%",
      opacity: 0,
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

  return (
    <div className="nomar">
      {isLoading ? null : (
        <motion.div
          initial={{ opacity: 0.1, x: "100vh" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100vh" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
          style={{
            backgroundColor: "black",
            backgroundImage: `${
              back ? `url(https://image.tmdb.org/t/p/w500/${back})` : "black"
            }`,
          }}
          className="backdrop detail"
        ></motion.div>
      )}

      <div className="">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="col">
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              className="info-with-poster banner mr"
            >
              <div className="col">
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
                        whileHover={{
                          scale: 1.2,
                        }}
                        src={play}
                        alt="menu"
                        className="navs dont-show"
                        onClick={() => getTrailer()}
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
                        onClick={() => getTrailer()}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.2 }}
                      >
                        Watch Trailer
                      </motion.h2>
                    </div>
                  </div>
                  <motion.img
                    src={
                      detail.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
                        : image
                    }
                    alt="Poster"
                    className="poster"
                    animate={
                      hov
                        ? { filter: "brightness(40%)" }
                        : { filter: "brightness(100%)" }
                    }
                  ></motion.img>
                </div>
                {detail.networks ? (
                  <div className="col center">
                    <h3>Available On</h3>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${detail.networks[0].logo_path}`}
                      alt="network"
                      className="network-logo mr"
                    ></img>
                    <h2>{detail.networks[0].name}</h2>
                  </div>
                ) : null}
              </div>
              <div className="info  now-center">
                <div className="detail-function">
                  <div className="row mar-r">
                    <motion.img
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.2 }}
                      variants={hovervariants}
                      initial="nohoverl"
                      animate={"show"}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        bounce: "0.25",
                      }}
                      src={play}
                      alt="menu"
                      className="navs"
                      onClick={() => getTrailer()}
                    ></motion.img>
                    <motion.h2
                      variants={hovervariants}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      initial="nohoverr"
                      animate={"show"}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        bounce: "0.25",
                      }}
                      className="point"
                      onClick={() => getTrailer()}
                    >
                      Watch Trailer
                    </motion.h2>
                  </div>
                  <div className="mar-r">
                    <ModifyWatchlist
                      media_type={media}
                      tmdbID={id}
                      title={detail.title ? detail.title : detail.name}
                    />
                  </div>
                  <SuggestCover
                    media_type={media}
                    tmdbID={id}
                    title={detail.title ? detail.title : detail.name}
                  />
                </div>
                {/* </div> */}
                {detail.title ? (
                  <h1>{detail.title}</h1>
                ) : (
                  <h1>{detail.name}</h1>
                )}
                <div className="row">
                  <span className="mar-r">
                    <h3>
                      {media.charAt(0).toUpperCase() + "" + media.substring(1)}
                    </h3>
                  </span>
                  <span>
                    {detail.runtime ? <h4>{detail.runtime}min</h4> : null}
                    {detail.episode_run_time ? (
                      <h4>{detail.episode_run_time[0]}min</h4>
                    ) : null}
                  </span>
                </div>
                {detail.release_date ? (
                  <div className="mt mb">
                    <label>
                      <i>Released On</i>
                    </label>
                    <h3 className="nomar">{calDate(detail.release_date)}</h3>
                  </div>
                ) : null}
                {detail.first_air_date ? (
                  <div className="mt mb">
                    <label>
                      <i>First Air Date</i>
                    </label>
                    <h3 className="nomar">{calDate(detail.first_air_date)}</h3>
                  </div>
                ) : null}
                <div className="row smallwrap">
                  {detail.genres.map((gen, index) => (
                    <div className="gens" key={index}>
                      {gen.name}
                    </div>
                  ))}
                </div>
                <h3>
                  <i style={{ color: "darkgray" }}>{detail.tagline}</i>
                </h3>
                <div className="mt">
                  <label>
                    <i>Overview</i>
                  </label>
                  <h3 className="nomar">{detail.overview}</h3>
                </div>
                <div className="mt">
                  <label>
                    <i>Rating</i>
                  </label>
                  <h4 className="nomar">{detail.vote_average}</h4>
                </div>
                <div className="mt">
                  <label>
                    <i>Status</i>
                  </label>
                  <h4 className="nomar">{detail.status}</h4>
                </div>
              </div>
            </motion.div>
            <Recommendations media={media} id={id} />
          </div>
        )}
      </div>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCover);
