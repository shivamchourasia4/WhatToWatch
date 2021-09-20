import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import List from "./List";
import Loader from "./Loader";

export default function CarasoulCover(props) {
  const [mediaData, setmediaData] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [tab, setTab] = useState("trend");

  const whichTabs = ["trend", "popular", "top_rated"];

  useEffect(() => {
    const getList = () => {
      var url = "";
      if (tab === "trend") {
        url = `https://api.themoviedb.org/3/trending/${props.mediaType}/week?api_key=${process.env.REACT_APP_API_KEY}`;
      } else {
        url = `https://api.themoviedb.org/3/${props.mediaType}/${tab}?api_key=${process.env.REACT_APP_API_KEY}`;
      }
      axios
        .get(url)
        .then((res) => {
          setmediaData(res.data.results);
          setisLoading(true);
        })
        .catch();
    };
    setisLoading(false);
    getList();
  }, [tab, props.mediaType]);

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

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
      className="carasoul-cover"
      target={props.mediaType}
    >
      <div className="select-cover">
        <h1>
          {props.mediaType === "movie"
            ? props.mediaType.charAt(0).toUpperCase() +
              "" +
              props.mediaType.substring(1) +
              "s"
            : props.mediaType.charAt(0).toUpperCase() +
              "" +
              props.mediaType.substring(1) +
              " Shows "}{" "}
          For You
        </h1>
        <div>
          <AnimateSharedLayout>
            <div className="optns">
              {whichTabs.map((which) => (
                <div
                  className="optn"
                  key={which}
                  onClick={() => {
                    setTab(which);
                  }}
                >
                  {which === "trend" ? (
                    <h2>Trending</h2>
                  ) : which === "popular" ? (
                    <h2>Popular</h2>
                  ) : (
                    <h2>Top Rated</h2>
                  )}
                  {tab === which && (
                    <motion.div
                      layoutId="outline"
                      className="outline"
                      initial={false}
                      animate={{ borderBlockColor: "yellow" }}
                      transition={spring}
                    />
                  )}
                </div>
              ))}
            </div>
          </AnimateSharedLayout>
        </div>
      </div>
      <div>
        <div className="center">
          {isLoading ? (
            <List movies={mediaData} mediaType={props.mediaType} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </motion.div>
  );
}
