import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import search from "../decor/search-solid.svg";

function SearchBar() {
  const [qru, setQry] = useState("");
  const history = useHistory();
  const variants = {
    enter: { x: "100%" },
    center: {
      x: 0,
    },
    exit: {
      x: "-100%",
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      className="banner"
    >
      <h2>Search from millions of movies and TV shows.</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/search?query=${qru}`);
        }}
      >
        <motion.div
          className="flexy"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
        >
          <input
            type="search"
            placeholder="Search Movies or TV Shows"
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
              onClick={() => {
                history.push(`/search?query=${qru}`);
              }}
            ></motion.img>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default SearchBar;
