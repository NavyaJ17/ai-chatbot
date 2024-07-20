import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProcessedText = ({ text }) => {
  function processText(text) {
    let formattedText = text.replace(/\n/g, "<br>");
    const codeReplaced = formattedText.replace(
      /```([^*]+)```/g,
      "<pre className='code'>$1</pre>"
    );
    const symbolReplaced = codeReplaced.replace(
      /(?!\*)`(?!\*)([^*]+)(?!\*)`(?!\*)/g,
      "<code>$1</code>"
    );
    const strongReplaced = symbolReplaced.replace(
      /\*\*([^*]+)\*\*/g,
      "<strong>$1</strong>"
    );

    const liReplaced = strongReplaced.replace(/\*([^*]+)/g, "<li>$1</li>");
    return liReplaced;
  }
  const processedText = processText(text);

  return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
};

function Chat() {
  const { chatId } = useParams();
  const [chat, setChat] = useState([]);
  const input = useRef();

  async function handleClick() {
    try {
      console.log(input.current.value);
      const res = await axios.patch(
        `http://localhost:8080/chat/${chatId}`,
        { prompt: { text: input.current.value } },
        { withCredentials: true }
      );
      setChat(res.data.chat.history);
      input.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:8080/chat/${chatId}`, {
          withCredentials: true,
        });
        console.log("Get response:", res.data);
        setChat(res.data.history || []);
      } catch (error) {
        console.error("Error fetching chat data:", error);
        setChat([]);
      }
    }

    fetchData();
  }, [chatId]);

  return (
    <div className="chat-page">
      <Sidebar />
      <div className="chats">
        <div className="chat-container">
          {chat.length > 0
            ? chat.map((item, index) => {
                return (
                  <div className="msg" key={index}>
                    {item.role === "user" ? (
                      <div className="role user">{item.role}</div>
                    ) : (
                      <div className="role model">{item.role}</div>
                    )}
                    <div className="text">
                      {item.parts[0] && item.parts[0].hasOwnProperty("text") ? (
                        <ProcessedText text={item.parts[0].text} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="prompt-input">
          <input type="text" ref={input} placeholder="Enter a prompt" />
          <button>
            <span class="material-symbols-rounded">add_photo_alternate</span>
          </button>
          <button onClick={handleClick}>
            <span class="material-symbols-rounded">arrow_upward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
