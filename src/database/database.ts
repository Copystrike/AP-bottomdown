import { MongoClient } from "mongodb";

const uri = "mongodb+srv://webontwikkeling:mourad123@webontwikkeling.c6l5ocp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseClient = client.db("bottomg");

// connect to database
const connectDatabase = async () => {
  try {
    await client.connect();
    console.log("CONNECTED TO DATABASE");
    process.on("SIGINT", async () => {
      await closeDatabase();
    });
  } catch (error) {
    console.error(error);
  }
};

// close database
const closeDatabase = async () => {
  try {
    await client.close();
    console.log("DISCONNECTED FROM DATABASE");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

export { connectDatabase, closeDatabase, databaseClient };
