import React, { useState } from "react";
import { motion } from "framer-motion";
import search from "../decor/search-solid.svg";
import axios from "axios";
import Loader from "./Loader";
import UserItem from "./UserItem";
import { useHistory } from "react-router";

function SearchPeople() {
  const [qry, setQry] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const variants = {
    enter: { x: "-100%" },
    center: {
      x: 0,
    },
    exit: {
      x: "100%",
    },
  };

  const getsearch = (e) => {
    e.preventDefault();
    if (qry.length > 0) {
      setLoading(true);

      setShowResults(true);
      const url = `/wtw/users/search?name=${qry}`;
      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setPeople(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    }
  };

  return (
    <div>
      <motion.div
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        className="banner"
      >
        <h1>Connect To People</h1>
        <h2>Search People, Accept Requests And Start Sharing. Voila.</h2>
        <form onSubmit={getsearch}>
          <motion.div
            className="flexy"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
          >
            <input
              type="search"
              placeholder="Search People"
              className="input-form"
              onChange={(e) => setQry(e.target.value)}
            ></input>
            <div className="stick">
              <motion.img
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                src={search}
                alt="search"
                className="icons"
                type="submit"
                onClick={getsearch}
              ></motion.img>
            </div>
          </motion.div>
        </form>

        {showResults ? (
          <React.Fragment>
            <div>
              <h1>Search Results</h1>
              {loading ? (
                <Loader />
              ) : (
                <div className="scroll-container-people scroller">
                  {people.length === 0 ? (
                    <h1 className="errmsg mr">No User Found.</h1>
                  ) : (
                    people.map((request) => (
                      <UserItem key={request._id} user={request._id} />
                    ))
                  )}
                </div>
              )}
            </div>
          </React.Fragment>
        ) : null}
      </motion.div>
    </div>
  );
}

export default SearchPeople;
