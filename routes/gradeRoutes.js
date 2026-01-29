import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.js";

const router = express.Router();

// Create new entries
router.post("/", async (req, res) => {
  const { scores, class_id, learner_id, student_id } = req.body;

  // checking if anything is missing
  if (!scores || !class_id) {
    return res.status(400).json({ error: "Insufficient Data" });
  }

  res.send('testing')

//   // Specify Collection
//   let collection = db.collection("grades");

//   // Specify Action
//   let result = await collection.insertOne();

//   // Return results
//   res.json(result);
});

//GET grades by _id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };

  // Specify Collection
  let collection = db.collection("grades");

  // Specify Action only return null or the object
  let result = await collection.findOne(query);

  // Return the Results!!
  if (!result) res.status(404).json({ error: "Not Found" });
  else res.json(result);
});

// Get by student_ID
router.get("/learner/:id", async (req, res) => {
  let query = { learner_id: Number(req.params.id) };
  //Specify Collection
  let collection = db.collection("grades");

  // Specify Action
  let results = await collection.find(query).toArray();

  // Return the results
  if (!results.length) res.status(404).json({ error: "Not Found" });
  else res.json(results);
});

// Get by class
router.get("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };
  //Specify Collection
  let collection = db.collection("grades");

  // Specify Action
  let results = await collection.find(query).toArray();

  // Return the results
  if (!results.length) res.status(404).json({ error: "Not Found" });
  else res.json(results);
});

export default router;
