# Real-Time Chat Application - Thought Process & Implementation Details

## 📌 1. Introduction

This document explains the thought process and technical implementation behind the real-time chat application built using Node.js, WebSockets, and React.

## 📌 2. Thought Process & Architecture

### **2.1 Problem Statement**

The goal was to create a real-time chat system where multiple users can communicate. The system should:

- Enable real-time messaging.
- Handle multiple user connections.
- Support auto-reconnection in case of WebSocket failure.
- Be scalable for future enhancements like private messaging and authentication.

### **2.2 Technology Stack & Justification**

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| Node.js              | Backend server for WebSockets           |
| WebSockets (ws)      | Real-time communication protocol        |
| React.js (Vite)      | Frontend for the chat UI                |
| useState & useEffect | Manage WebSocket state and messages     |
| useRef               | Maintain WebSocket connection reference |

### **2.3 System Architecture**

The chat system follows a **client-server** architecture:

- **Frontend (React.js)**
  - Establishes a WebSocket connection to the server.
  - Sends user messages to the WebSocket server.
  - Listens for incoming messages and displays them in real-time.
  - Handles connection loss and automatic reconnection.
- **Backend (Node.js + WebSocket)**
  - Manages WebSocket connections.
  - Broadcasts messages to all connected clients.
  - Handles client disconnections and reconnections.

---

## 📌 3. Implementation Details

### **3.1 WebSocket Server Implementation (`server.js`)**

- A WebSocket server is created using the `ws` library.
- The server listens for incoming messages and broadcasts them to all connected clients.
- Each client is stored in an array to manage connections.
