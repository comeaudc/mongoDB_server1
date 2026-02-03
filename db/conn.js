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

  await createCollectionSetup();
  await createGradesSchema();
} catch (error) {
  console.error(error);
  process.exit(1);
}

async function createCollectionSetup() {
  const grades = db.collection("grades");

  await grades.createIndex({ learner_id: -1 });
  await grades.createIndex({ class_id: 1 });
  // await grades.class_id({"scores.score": 1});
}

async function createGradesSchema() {
  await db.command({
    collMod: "grades",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["learner_id", "class_id", "scores"],
        properties: {
          learner_id: {
            bsonType: "int",
          },
          class_id: {
            bsonType: "int",
          },
          scores: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["type", "score"],
              properties: {
                type: {
                  enum: ["quiz", "exam", "homework"],
                },
                score: {
                  bsonType: ["int", "double"],
                  minimum: 0,
                },
              },
            },
          },
        },
      },
    },
  });
}

export default db;
