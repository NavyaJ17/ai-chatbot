import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Signup from "./Components/Pages/Signup";
import Login from "./Components/Pages/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Pages/Chat";
import NewChat from "./Components/Pages/NewChat";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/:id/chat/new" element={<NewChat />} />
        <Route path="/:id/chat/:chatId" element={<Chat />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
