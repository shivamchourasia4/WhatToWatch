import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import menu from "../decor/menu-white.svg";
import collapse from "../decor/collapse.svg";
import { useHistory } from "react-router";
import github from "../decor/github.svg";

function Menu(props) {
  const [showHam, setshowHam] = useState(false);

  const history = useHistory();
  const variants = {
    hidden: {
      left: "-100%",
      transition: {
        type: "spring",
        bounce: 0.25,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      left: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const menuvariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", bounce: 0.1, duration: 0.2 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.1, duration: 0.2 },
    },
  };

  return (
    <React.Fragment>
      <div>
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          src={menu}
          alt="menu"
          className="navs"
          onClick={() => setshowHam(true)}
        ></motion.img>
      </div>

      <AnimatePresence>
        {showHam ? (
          <motion.div
            variants={variants}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            className="ham"
          >
            <motion.img
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              src={collapse}
              alt="menu"
              className="navs collapse"
              onClick={() => setshowHam(false)}
            ></motion.img>
            <div className="center col">
              <motion.span variants={menuvariants} className="mr">
                <h2>What To Watch</h2>
              </motion.span>
              {props.loggedIn ? (
                <div className="menu-cover">
                  <motion.span
                    variants={menuvariants}
                    className="mr point link"
                    onClick={() => {
                      setshowHam(false);
                      history.push("/watchlist");
                    }}
                  >
                    <h3>Watchlist</h3>
                  </motion.span>
                  <motion.span
                    variants={menuvariants}
                    className="mr point link"
                    onClick={() => {
                      setshowHam(false);
                      history.push("/people");
                    }}
                  >
                    <h3>People</h3>
                  </motion.span>
                  <motion.span
                    variants={menuvariants}
                    className="mr point link link"
                    onClick={() => {
                      setshowHam(false);
                      history.push("/suggestions");
                    }}
                  >
                    <h3>Suggestions</h3>
                  </motion.span>
                  <motion.span
                    variants={menuvariants}
                    className="mr point link"
                    onClick={() => {
                      setshowHam(false);
                      localStorage.removeItem("wtwtoken");
                      history.push("/login");
                    }}
                  >
                    <h3>Logout</h3>
                  </motion.span>
                </div>
              ) : (
                <div className="menu-cover">
                  <motion.span
                    variants={menuvariants}
                    className="mr point link"
                    onClick={() => {
                      setshowHam(false);
                      history.push("/register");
                    }}
                  >
                    <h3>Sign Up</h3>
                  </motion.span>
                  <motion.span
                    variants={menuvariants}
                    className="mr point link"
                    onClick={() => {
                      setshowHam(false);
                      history.push("/login");
                    }}
                  >
                    <h3>Sign In</h3>
                  </motion.span>
                  <motion.span variants={menuvariants} className="mr">
                    <h3>
                      <a
                        href="https://github.com/shivamchourasia4/"
                        className="link"
                      >
                        Contact Us
                      </a>
                    </h3>
                  </motion.span>
                </div>
              )}
            </div>

            <motion.div variants={menuvariants} className="center">
              <div className="col center">
                <a href="https://github.com/shivamchourasia4/">
                  <img src={github} alt="mongodb" className="small-navs"></img>
                </a>
                <h3>What To Watch&#169; 2021</h3>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </React.Fragment>
  );
}

export default Menu;
