import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import UserEntity from "./UserEntity";
import Loader from "./Loader";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

function ConnectRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getresource = async () => {
      const id = jwt_decode(localStorage.getItem("wtwtoken")).id;

      const url = `/wtw/connect/${id}`;

      await axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setLoading(false);
          setRequests(res.data);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };
    getresource();
  }, [history]);

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
      className="join-cover"
    >
      <div className="center">
        <div className="optn nomar">
          <h1 className="mr">Connect Requests</h1>
          <div className="outline"></div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {requests.length === 0 ? (
            <h2 className="errmsg center">No Pending Connect Requests.</h2>
          ) : (
            requests.map((request) => (
              <UserEntity key={request._id} user={request.connectId} />
            ))
          )}
        </React.Fragment>
      )}
    </motion.div>
  );
}

export default ConnectRequest;
