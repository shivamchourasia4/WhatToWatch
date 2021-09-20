import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [msg, setMsg] = useState(null);

  const history = useHistory();

  const variants = {
    enter: { x: "-100%" },
    center: {
      x: 0,
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  };

  const submit = (e) => {
    e.preventDefault();
    e.preventDefault();

    axios
      .post("/wtw/login", {
        email: email,
        password: pswd,
      })
      .then((res) => {
        localStorage.setItem("wtwtoken", res.data.token);
        history.push("/");
      })
      .catch((err) => setMsg(err.response.data.msg));
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0.1, x: "100vh" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100vh" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
        className="backdrop login-image"
      ></motion.div>
      <motion.div
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        className="login-container"
      >
        <Link to="/" className="link">
          <h1>What to Watch</h1>
        </Link>
        <h2>Login</h2>
        <p className="errmsg">{msg}</p>
        <form onSubmit={submit}>
          {/* <label className="form-label">Email</label> */}
          <input
            type="email"
            className="input-form rest mt"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {/* <label className="form-label">Password</label> */}
          <input
            type="password"
            className="input-form rest mt"
            placeholder="Password"
            onChange={(e) => setPswd(e.target.value)}
            required
          ></input>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="btn mt"
          >
            Sign In
          </motion.button>
          <br></br>
          {/* <Link type="submit" className="btn mt" to="/">
            Forgot Password?
          </Link> */}
        </form>
        <br />
        <hr />
        <p>Don't Have An Account ?</p>
        <Link className="link" to="/register">
          <h4>Sign Up</h4>
        </Link>
      </motion.div>
    </div>
  );
}

export default Login;
