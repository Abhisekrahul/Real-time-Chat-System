import "./App.css";
import React, { useState, useEffect, useRef } from "react";

const WS_URL = "ws://localhost:5000";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      setIsConnected(true);
      setStatusMessage("Connected to WebSocket ✅");
      console.log("Connected to WebSocket");
    };

    ws.current.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);

      if (Array.isArray(receivedData.recentMessages)) {
        setMessages(receivedData.recentMessages.reverse()); // Display in correct order
      } else {
        setMessages((prev) => [...prev, receivedData]);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      setStatusMessage("Disconnected. Reconnecting in 3 seconds...");
      console.log("Disconnected. Reconnecting in 3 seconds...");
      setTimeout(() => {
        ws.current = new WebSocket(WS_URL);
      }, 3000);
    };

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = { sender: name, content: message };
    ws.current.send(JSON.stringify(newMessage));
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Real-Time Chat</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className={isConnected ? "info" : "warning"}>{statusMessage}</p>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}: </strong>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={!isConnected}>
        Send
      </button>
    </div>
  );
}

export default App;
