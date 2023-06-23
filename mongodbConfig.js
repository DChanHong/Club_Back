const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://bkn367:%40hong9788%40@club.1h1jv8i.mongodb.net/chatDB?retryWrites=true&w=majority";

const connectDB = async () => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.db("chatDB");
};

module.exports = connectDB;
