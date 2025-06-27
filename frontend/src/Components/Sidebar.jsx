import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const params = useParams();
  const [user, setUser] = useState({ chats: [] });
  const navigate = useNavigate();

  function handleClick(item) {
    navigate(`/${params.id}/chat/${item._id}`);
  }

  function handleSubmit() {
    navigate(`/${params.id}/chat/new`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://ai-chatbot-7cri.onrender.com/${params.id}`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [params]);

  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={handleSubmit}>
        <span className="material-symbols-rounded">add</span>New Chat
      </button>
      <h5>Recent</h5>
      {user.chats.length > 0
        ? user.chats.map((item, index) => {
            return (
              <div>
                {params.chatId && params.chatId === item._id ? (
                  <div
                    className="list selected"
                    onClick={() => handleClick(item)}
                    key={index}
                  >
                    <span class="material-symbols-rounded">chat_bubble</span>{" "}
                    <p>{item.systemInstruction}</p>
                  </div>
                ) : (
                  <div
                    class="list"
                    onClick={() => handleClick(item)}
                    key={index}
                  >
                    <span className="material-symbols-rounded">
                      chat_bubble
                    </span>{" "}
                    <p>{item.systemInstruction}</p>
                  </div>
                )}
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Sidebar;
