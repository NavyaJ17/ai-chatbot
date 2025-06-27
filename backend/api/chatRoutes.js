const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const isLoggedIn = require("../middleware");
const Chat = require("../models/Chat");
const User = require("../models/User");
const dotenv = require("dotenv").config();

router.post("/chat/new", isLoggedIn, async (req, res) => {
  let { systemInstruction } = req.body;
  try {
    const chat = new Chat({
      systemInstruction: systemInstruction,
      history: [],
      user: req.user._id,
    });
    await chat.save();
    const user = await User.findById(req.user._id);
    user.chats.push(chat._id);
    await user.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/chat/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/chat/:id", isLoggedIn, async (req, res) => {
  try {
    const { prompt } = req.body;
    const { text, path } = prompt;
    const { id } = req.params;
    const chat = await Chat.findById(id);
    const chatHistory = chat.history;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: chat.systemInstruction,
      tools: [
        {
          codeExecution: {},
        },
      ],
    });
    if (path !== undefined) {
      const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
      const uploadResult = await fileManager.uploadFile(path, {
        mimeType: "image/jpeg",
        displayName: path,
      });
      const file = uploadResult.file;
      chatHistory.push({
        role: "user",
        parts: [{ fileData: { mimeType: file.mimeType, fileUri: file.uri } }],
      });
    }
    const chatSession = model.startChat({ history: chatHistory });
    const result = await chatSession.sendMessage(text);
    chat.history = chatHistory;
    const updatedChat = await chat.save();

    res.status(200).json({ chat: updatedChat });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
