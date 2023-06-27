const connectDB = require("../mongodbConfig");

// 채팅 인설트 기능
const insertChat = async (message) => {
  try {
    const db = await connectDB();
    const result = await db.collection("messages").insertOne(message);
  } catch (error) {
    console.error("Error inserting message:", error);
  }
};
const insertAllChat = async (message) => {
  try {
    const db = await connectDB();
    // const result = await db.collection("messages").insertMany(message);
  } catch (error) {
    console.error(error);
  }
};

const selectAllChat = async (C_IDX) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("messages")
      .find({ C_IDX: String(C_IDX) })
      .sort({ time: "ascending" })
      .toArray();

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { insertChat, insertAllChat, selectAllChat };
