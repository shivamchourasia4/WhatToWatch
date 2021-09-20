import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SuggestApply from "./SuggestApply";
import { useHistory } from "react-router";

function PeopleCover(props) {
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
  return (
    <div className="popup-cover col center">
      <div className="center popup">
        <div className="optn nomar">
          <h1 className="mr">Suggest To Your Connections</h1>
          <div className="outline"></div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {people.length === 0 ? (
            <div className="join-cover mr">
              <h1 className="errmsg">
                You Do Not Have Any Connection To Suggest !
              </h1>
              <h2 className="errmsg">
                {" "}
                Start Making Connections To Share Movies And TV Shows.
              </h2>
            </div>
          ) : (
            people.map((request) => (
              <SuggestApply
                key={request._id}
                user={request.connectId}
                reqData={props.reqData}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PeopleCover;
