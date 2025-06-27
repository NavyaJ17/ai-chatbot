import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  let emailInp = useRef();
  let usernameInp = useRef();
  let passInp = useRef();
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await axios.post(
      "https://ai-chatbot-7cri.onrender.com/signup",
      {
        email: emailInp.current.value,
        username: usernameInp.current.value,
        password: passInp.current.value,
      },
      { withCredentials: true }
    );
    console.log(res);
    navigate("/login");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" ref={emailInp}></input>
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" ref={usernameInp}></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" ref={passInp}></input>
        </div>
        <div>
          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login now
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
