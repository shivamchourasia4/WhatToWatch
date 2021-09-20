import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import jwt_decode from "jwt-decode";
import axios from "axios";
import UserList from "./UserList";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

function Connections() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getConnections = () => {
      const id = jwt_decode(localStorage.getItem("wtwtoken")).id;

      const url = `/wtw/connections/${id}`;

      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setLoading(false);
          setPeople(res.data);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };

    getConnections();
  }, [history]);

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
      className="join-cover greyback now-full"
    >
      <h1 className="nomar">Your Connections</h1>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {people.length === 0 ? (
            <span>
              <h2 className="errmsg">You Do Not Have Any Connection !</h2>
              <h3 className="errmsg">
                {" "}
                Start Making Connections To Share Movies And TV Shows.
              </h3>
            </span>
          ) : (
            people.map((request) => (
              <UserList key={request._id} user={request.connectId} />
            ))
          )}
        </React.Fragment>
      )}
    </motion.div>
  );
}

export default Connections;
