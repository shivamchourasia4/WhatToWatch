import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [confpswd, setConfpswd] = useState("");
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

    if (pswd !== confpswd) {
      setMsg("Passwords Did Not Match!");
    } else {
      axios
        .post("/wtw/register", {
          email: email,
          password: pswd,
          firstname: firstname,
          username: username,
          lastname: lastname,
        })
        .then((res) => {
          localStorage.setItem("wtwtoken", res.data.token);
          history.push("/");
        })
        .catch((err) => setMsg(err.response.data.msg));
    }
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
        <h2>Register</h2>
        <p className="errmsg">{msg}</p>
        <form onSubmit={submit}>
          <div className="res-row">
            <input
              type="text"
              className="input-form rest mt mar-r"
              placeholder="First Name"
              required
              onChange={(e) => setFirstname(e.target.value)}
            ></input>
            <input
              type="text"
              className="input-form rest mt"
              placeholder="Last Name"
              required
              onChange={(e) => setLastname(e.target.value)}
            ></input>
          </div>
          <div className="res-row">
            <input
              type="text"
              className="input-form rest mt mar-r"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="email"
              className="input-form rest mt"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="res-row">
            <input
              type="password"
              className="input-form rest mt mar-r"
              placeholder="Password"
              onChange={(e) => setPswd(e.target.value)}
              required
            ></input>
            <input
              type="password"
              className="input-form rest mt"
              placeholder="Confirm Password"
              onChange={(e) => setConfpswd(e.target.value)}
              required
            ></input>
          </div>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="btn mt"
          >
            Sign Up
          </motion.button>
          <br></br>
          {/* <Link type="submit" className="btn mt" to="/">
            Forgot Password?
          </Link> */}
        </form>
        <br />
        <hr />
        <p>Already Have An Account ?</p>
        <Link className="link" to="/login">
          <h4>Sign In</h4>
        </Link>
      </motion.div>
    </div>
  );
}

export default Register;
