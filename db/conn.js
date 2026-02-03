import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionStr = process.env.MONGO_URI || "";

const client = new MongoClient(connectionStr);

let conn;
let db;

try {
  conn = await client.connect();

  console.log(`MongoDB Connected...`);

  db = conn.db("sample_training");

  await createCollectionSetup()

} catch (error) {
  console.error(error);
  process.exit(1);
}

async function createCollectionSetup() {
  const grades = db.collection("grades");

  await grades.createIndex({ learner_id: -1 });
  await grades.createIndex({class_id: 1})
}

export default db;