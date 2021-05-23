import React from "react";
import Menu from "./Menu";
import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";

function KindaNav(props) {
  const history = useHistory();
  return (
    <div className="kindanav">
      <Menu loggedIn={props.loggedIn} />
      <div>
        <Link to="/" className="link">
          <h1 className="mr">What To Watch</h1>
        </Link>
      </div>
      <div>
        {props.loggedIn ? (
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="mr"
            onClick={() => {
              localStorage.removeItem("wtwtoken");
              history.push("/login");
            }}
          >
            Sign Out
          </motion.button>
        ) : (
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="mr"
            onClick={() => history.push("/login")}
          >
            Sign In
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default KindaNav;
