import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PosterLoader from "./PosterLoader";

function UserList(props) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {loading ? (
        <PosterLoader />
      ) : (
        <div className="res-row kindanav mr scroller-auto  scroller maxcontent">
          <div className="row center">
            <div className="user-circle">
              <h3>{info.firstname.charAt(0).toUpperCase()}</h3>
            </div>
            <h3>
              <span className="errmsg">{info.username} </span>
              is a connection.
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
