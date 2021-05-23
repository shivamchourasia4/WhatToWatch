import React from "react";
import { motion } from "framer-motion";

function AskJoin() {
  return (
    <div className="join-cover">
      <h1 className="nomar">Join Today</h1>
      <div className="row ask-media">
        <motion.div className="col ask">
          <h3>
            Get access to maintain your own custom personal lists track what
            you've seen and search and filter for what to watch next—regardless
            if it's in theatres, on TV or available on popular streaming
            services like Netflix, Amazon Prime Video, Jio Cinema, and Viu.
          </h3>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="mr"
          >
            Sign up
          </motion.button>
        </motion.div>
        <motion.div>
          <h3 className="points">Maintain a personal watchlist.</h3>
          <h3 className="points">
            {" "}
            Filter and search and find something to watch.
          </h3>
          <h3 className="points">
            {" "}
            Log the movies and TV shows you have already seen.
          </h3>
          <h3 className="points">
            Share or Recommend Movies / TV Shows to your friends and family!
          </h3>
        </motion.div>
      </div>
    </div>
  );
}

export default AskJoin;
