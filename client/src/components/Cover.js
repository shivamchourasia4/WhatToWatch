import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cover() {
  const [back, setBack] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getbackDrop = () => {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setBack(
            res.data.results[Math.floor(Math.random() * 10 + 1)].backdrop_path
          );
          setIsLoading(false);
        })
        .catch();
    };
    getbackDrop();
  }, []);

  return (
    <div className="nomar">
      {isLoading ? null : (
        <motion.div
          initial={{ opacity: 0.1, x: "100vh" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100vh" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${back})`,
          }}
          className="backdrop"
        ></motion.div>
      )}
    </div>
  );
}
