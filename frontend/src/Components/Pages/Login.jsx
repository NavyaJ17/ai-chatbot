import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let usernameInp = useRef();
  let passInp = useRef();
  let navigate = useNavigate();
  let [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await axios.post(
<<<<<<< HEAD
      "https://ai-chatbot-7cri.onrender.com/login",
=======
      "http://localhost:8080/login",
>>>>>>> fresh-start
      {
        username: usernameInp.current.value,
        password: passInp.current.value,
      },
      { withCredentials: true }
    );
    if (res.data.msg !== "Login successful") {
      setError(res.data);
      navigate("/login");
    } else {
      navigate(`/${res.data.user._id}/chat/new`);
    }
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {Object.keys(error).length > 0 && (
          <p>{error.msg[error.msg.length - 1]}</p>
        )}
        <h1>Sign in</h1>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" ref={usernameInp}></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" ref={passInp}></input>
        </div>

        <div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup now
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
