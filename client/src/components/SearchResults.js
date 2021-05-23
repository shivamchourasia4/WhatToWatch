import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { motion, AnimateSharedLayout } from "framer-motion";
import ResultList from "./ResultList";

export default function SearchResults(props) {
  var src = useQuery().get("query");
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState("movie");
  const [nores, setNores] = useState(false);
  const [cuurPage, setCurrPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);

  const whichTabs = ["movie", "tv"];

  useEffect(() => {
    const getData = async () => {
      var url = `https://api.themoviedb.org/3/search/${tab}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${src}&page=${cuurPage}&include_adult=false`;

      axios
        .get(url)
        .then((res) => {
          setTotalPage(res.data.total_pages);
          setResults(res.data.results);
          setIsLoading(false);
        })
        .catch();
    };

    if (src) {
      setIsLoading(true);
      setNores(false);
      getData();
    } else {
      setNores(true);
      setIsLoading(false);
    }
  }, [tab, cuurPage, src]);

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
    >
      {nores ? (
        <div className="center col">
          <h1>Hmm..</h1>
          <h1>Something is wrong with the url.</h1>
          <h1>No Search Result !</h1>
        </div>
      ) : (
        <motion.div
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          className="carasoul-cover"
          target="movie"
        >
          <div className="select-cover">
            <div className="center" id="theview">
              <h2>
                Search Results For <i>"{src}"</i>
              </h2>
            </div>
            {/* Filter Here! */}
            <AnimateSharedLayout>
              <div className="optns">
                {whichTabs.map((which) => (
                  <div
                    className="optn"
                    key={which}
                    onClick={() => {
                      setTab(which);
                      setCurrPage(1);
                    }}
                  >
                    {which === "movie" ? <h2>Movies</h2> : <h2>TV Shows</h2>}
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
          <div className="center">
            {isLoading ? <Loader /> : <ResultList datas={results} tab={tab} />}
          </div>
          {results && (
            <div>
              {results.length > 0 ? (
                <div className="center">
                  {cuurPage > 1 ? (
                    <button
                      className="mr"
                      onClick={() => {
                        setCurrPage(cuurPage - 1);
                        document.getElementById("theview").scrollIntoView(true);
                      }}
                    >
                      Prev
                    </button>
                  ) : null}
                  <h4>
                    Page {cuurPage} Of {TotalPage}
                  </h4>
                  {cuurPage > TotalPage - 1 ? null : (
                    <button
                      className="mr"
                      onClick={() => {
                        setCurrPage(cuurPage + 1);
                        document.getElementById("theview").scrollIntoView(true);
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
