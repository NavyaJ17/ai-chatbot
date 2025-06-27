# 🧠 AI-Chatbot with Gemini API

A full-stack AI chatbot application powered by Google's Gemini API. This chatbot allows users to:

- Create multiple chat conversations
- Assign system instructions (roles) for the AI model, altering its behavior per chat
- Manage authentication and protected routes
- A clean and intuitive frontend built with React.js, and backend APIs using Node.js & Express.js

---

## 📌 Features

- User Authentication: Sign up and login functionality with protected routes.
- Multiple Conversations: Start and manage several chats at once.
- System Instructions: Assign a role to each chat, defining how the AI responds.
- Persistent Storage: Chats and roles saved in a backend database.
- Frontend: Modern UI with React components for seamless interaction.
- Backend API: Built on Express.js for handling routes and Gemini API integration 

---

## 🚀 Tech Stack

**Frontend:**  
- React.js
- CSS 

**Backend:**  
- Node.js
- Express.js
- Gemini API (Google’s generative AI)  

**Database:**  
- MongoDB (with Mongoose ODM)   

---

## 📦 Installation & Running Locally

### 📥 Clone the repository
```
git clone https://github.com/yourusername/ai-chatbot.git
cd ai-chatbot
```

### 🔧 Backend Setup
```
cd backend
npm install
```

- Create a .env file and add your variables:

```
PORT=port_number
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY = your_gemini_api_key_here
```

- Start the server
```
npm start
```

### 💻 Frontend Setup
```
cd frontend
npm install
npm run dev
```

Visit your app at:

```
http://localhost:5173
```

## 📃 License
This project is licensed under the **MIT License**.

## 👩‍💻 Author
- [Navya Jain](https://github.com/NavyaJ17)

