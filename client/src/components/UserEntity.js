import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import confirm from "../decor/check-solid.svg";
import decline from "../decor/collapse-black.svg";
import PosterLoader from "./PosterLoader";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";

function UserEntity(props) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getInfo = (id) => {
      const url = `/wtw/privateuser/${id}`;

      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          setInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };

    getInfo(props.user);
  }, [history, props.user]);

  const accept = () => {
    const id = jwt_decode(localStorage.getItem("wtwtoken")).id;

    axios
      .post(
        "/wtw/connect/confirm",
        {
          id: id,
          c_id: props.user,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        }
      )
      .then((res) => {
        setAccepted(true);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          localStorage.removeItem("wtwtoken");
          history.push("/login");
        }
      });
  };

  return (
    <div>
      {loading ? (
        <PosterLoader />
      ) : (
        <React.Fragment>
          {declined ? (
            <div className="res-row kindanav mr scroller-auto  scroller maxcontent">
              <div className="row center">
                <div className="user-circle">
                  <h3>{info.username.charAt(0).toUpperCase()}</h3>
                </div>
                <h3>
                  <span className="errmsg">{info.username}'s </span>
                  request declined.
                </h3>
              </div>

              <div className="row mr center">
                <button className="ok-circle redback">
                  <motion.img
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    src={decline}
                    alt="menu"
                    className="smallest-navs"
                  ></motion.img>
                </button>
              </div>
            </div>
          ) : (
            <React.Fragment>
              {accepted ? (
                <div className="res-row kindanav mr">
                  <div className="row center">
                    <div className="user-circle">
                      <h3>{info.username.charAt(0).toUpperCase()}</h3>
                    </div>
                    <h3>
                      <span className="errmsg">{info.username} </span>
                      is now a connection.
                    </h3>
                  </div>
                  <div className="row mr center">
                    <button className="ok-circle greenback">
                      <motion.img
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        src={confirm}
                        alt="menu"
                        className="smallest-navs"
                      ></motion.img>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="res-row kindanav mr">
                  <div className="row center">
                    <div className="user-circle">
                      <h3>{info.username.charAt(0).toUpperCase()}</h3>
                    </div>

                    <h3>
                      <span className="errmsg">{info.username} </span>
                      wants to connect with you.
                    </h3>
                  </div>

                  <div className="row mr center">
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="btn row mar-r"
                      onClick={accept}
                    >
                      <motion.img
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        src={confirm}
                        alt="menu"
                        className="smallest-navs less-mr"
                      ></motion.img>
                      <h4 className="nomar">Accept</h4>
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="row decline-btn"
                      onClick={() => setDeclined(true)}
                    >
                      <motion.img
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        src={decline}
                        alt="menu"
                        className="smallest-navs less-mr"
                      ></motion.img>
                      <h4 className="nomar">Decline</h4>
                    </motion.button>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default UserEntity;
