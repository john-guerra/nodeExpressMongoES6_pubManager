import express from "express";

import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.get("/publications", async (req, res) => {
  console.log("Get /publications route called");
  const page = req.query.page ? +req.query.page : 1;
  const result = await myDB.getPublications({}, { page });
  res.json(result);
});

//Implement the remaining CRUD routes here (Create, Read by ID, Update, Delete)
router.post("/publications/create", async (req, res) => {
  const newPub = req.body;
  console.log("Create publication:", newPub);
  await myDB.addPublication(newPub);
  res.status(201).json({ message: "Publication created", publication: newPub });
});

router.get("/publications/:id", async (req, res) => {
  const pubId = req.params.id;
  console.log("Get publication by ID:", pubId);
  const publication = await myDB.getPublicationById(pubId);
  if (publication) {
    res.json(publication);
  } else {
    res.status(404).json({ message: "Publication not found" });
  }
});

router.put("/publications/:id", async (req, res) => {
  const pubId = req.params.id;
  const updatedPub = req.body;
  console.log("Update publication:", pubId, updatedPub);
  const result = await myDB.updatePublication(pubId, updatedPub);
  if (result.modifiedCount > 0) {
    res.json({ message: "Publication updated", publication: updatedPub });
  } else {
    res.status(404).json({ message: "Publication not found or not modified" });
  }
});

router.delete("/publications/:id", async (req, res) => {
  const pubId = req.params.id;
  console.log("Delete publication:", pubId);
  const result = await myDB.deletePublication(pubId);
  if (result.deletedCount > 0) {
    res.json({ message: "Publication deleted" });
  } else {
    res.status(404).json({ message: "Publication not found" });
  }
});

// Example of server-side rendering (commented out)
// router.get("/serverSide/", (req, res) => {
//   res.send(`<h1>Hola Mengyu</h1>
//     <h2>Publications</h2>
//     ${publications.map((pub) => `<div>${pub.title} <strong>${pub.journal}</strong></div> `).join("\n")}
//     `);
// });

export default router;
