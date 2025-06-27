import axios from "axios";
import React, { useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function NewChat() {
  let params = useParams();
  let input = useRef();
  let navigate = useNavigate();
  async function handleClick() {
    let res = await axios.post(
<<<<<<< HEAD
      "https://ai-chatbot-7cri.onrender.com/chat/new",
=======
      "http://localhost:8080/chat/new",
>>>>>>> fresh-start
      {
        systemInstruction: input.current.value,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    navigate(`/${params.id}/chat/${res.data._id}`);
  }
  return (
    <div className="chat-page">
      <Sidebar />
      <div className="new-chat">
        <div className="si"></div>
        <div className="prompt-input">
          <input
            type="text"
            ref={input}
            placeholder="Enter a system instruction"
          />
          <button type="submit" onClick={handleClick}>
            <span class="material-symbols-rounded">draw</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewChat;
