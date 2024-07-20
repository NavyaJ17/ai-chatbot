const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    fileData: {
      mimeType: { type: String },
      fileUri: { type: String },
    },
    text: { type: String },
  },
  { _id: false }
);

const historySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    parts: [partSchema],
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema({
  systemInstruction: { type: String },
  history: [historySchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
