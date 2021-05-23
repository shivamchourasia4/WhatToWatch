import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import RecommendList from "./RecommendList";

function Recommendations(props) {
  const [rec, setRec] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isnone, setIsnone] = useState(false);

  useEffect(() => {
    const getRec = async () => {
      let url = `https://api.themoviedb.org/3/${props.media}/${props.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
      await axios
        .get(url)
        .then((res) => {
          if (res.data.results.length < 1) {
            setIsnone(true);
          } else {
            setRec(res.data.results);
          }
          setIsLoading(true);
        })
        .catch();
    };

    setIsLoading(false);
    getRec();

    return () => {
      setIsLoading(false);
    };
  }, [props.media, props.id]);

  return (
    <>
      {isnone ? null : (
        <div className="carasoul-cover col" target="tv">
          <div className="center">
            <div className="optn">
              <h1 className="mr">Recommendations</h1>
              <div className="outline"></div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div className="">
              {isLoading ? (
                <RecommendList movies={rec} mediaType={props.media} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Recommendations;
