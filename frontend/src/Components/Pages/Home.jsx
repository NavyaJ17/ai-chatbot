import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";

function Home() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  const el = useRef();
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Welcome to AI ChatBot!"],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="home">
      <div>
        <h1 ref={el}></h1>
        <h6>
          Your personal assistant powered by cutting-edge AI technology. Chat
          with our bot to get instant answers, assistance, and more!
        </h6>
        <div className="steps">
          <div>
            <p>
              To get started, create an account or log in if you already have
              one. This will allow us to provide you with a personalized
              experience.
            </p>
            <div className="icon">
              <span class="material-symbols-rounded">account_circle</span>
            </div>
          </div>
          <div>
            <p>
              Give an instruction to the model that best fits your needs, we
              have tailored experiences for you.
            </p>
            <div className="icon">
              <span class="material-symbols-rounded">edit</span>
            </div>
          </div>
          <div>
            <p>
              Ask any question or request assistance. Our AI chatbot is here to
              help you with accurate and instant responses.
            </p>
            <div className="icon">
              <span class="material-symbols-rounded">chat</span>{" "}
            </div>
          </div>
        </div>
        <button className="login-btn" onClick={handleClick}>
          Sign in to your account
          <span class="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
