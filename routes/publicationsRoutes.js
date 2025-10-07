import express from "express";

import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.get("/publications", async (req, res) => {
  console.log("Get /publications route called");
  const result = await myDB.getPublications();
  res.json({ data: result });
});

// Example of server-side rendering (commented out)
// router.get("/serverSide/", (req, res) => {
//   res.send(`<h1>Hola Mengyu</h1>
//     <h2>Publications</h2>
//     ${publications.map((pub) => `<div>${pub.title} <strong>${pub.journal}</strong></div> `).join("\n")}
//     `);
// });

export default router;
