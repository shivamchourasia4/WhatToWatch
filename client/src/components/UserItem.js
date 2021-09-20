import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PosterLoader from "./PosterLoader";
import jwt_decode from "jwt-decode";
import add from "../decor/plus-solid.svg";
import confirm from "../decor/check-solid.svg";
import { useHistory } from "react-router";

function UserItem(props) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [isconnected, setIsConnected] = useState(false);
  const [requested, setRequested] = useState(false);

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
        })
        .catch((err) => {
          if (err.response.status === 400) {
            localStorage.removeItem("wtwtoken");
            history.push("/login");
          }
        });
    };

    const getConnected = (usrid) => {
      const id = jwt_decode(localStorage.getItem("wtwtoken")).id;
      const url = `/wtw/user/${id}`;

      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        })
        .then((res) => {
          res.data.connections.forEach((cntn) => {
            if (cntn.connectId === usrid) {
              if (cntn.confirmed) {
                setIsConnected(true);
              } else {
                setRequested(true);
              }
            }
          });
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

    getConnected(props.user);
  }, [history, props.user]);

  const reqConnect = () => {
    const id = jwt_decode(localStorage.getItem("wtwtoken")).id;

    axios
      .post(
        "/wtw/connect",
        {
          id: id,
          c_id: props.user,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("wtwtoken") },
        }
      )
      .then(() => {
        setRequested(true);
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
        <div className="row user-container kindanav center scroller-auto  scroller">
          <div className="row center">
            <div className="user-circle">
              <h3>{info.firstname.charAt(0).toUpperCase()}</h3>
            </div>
            <span>
              <h3 className="errmsg nomar">{info.username}</h3>
              <h5 className="nomar">
                {info.firstname.charAt(0).toUpperCase() +
                  "" +
                  info.firstname.substring(1)}{" "}
                {info.lastname.charAt(0).toUpperCase() +
                  "" +
                  info.lastname.substring(1)}
              </h5>
            </span>
          </div>

          <div className="row mr center">
            {isconnected ? (
              <button className="row mar-r greenback">
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
                <h4 className="nomar">Connected</h4>
              </button>
            ) : (
              <React.Fragment>
                {requested ? (
                  <button className="row mar-r decline-btn">
                    <h4 className="nomar">Requested</h4>
                  </button>
                ) : (
                  <motion.button
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="btn row mar-r"
                    onClick={reqConnect}
                  >
                    <motion.img
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      src={add}
                      alt="menu"
                      className="smallest-navs less-mr"
                    ></motion.img>
                    <h4 className="nomar">Connect</h4>
                  </motion.button>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserItem;
