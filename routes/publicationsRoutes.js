import express from "express";

const publications = [
  {
    id: 1,
    title: "Learning JavaScript",
    doi: "10.1000/182",
    authors: ["John Doe", "Jane Smith"],
    year: 2020,
    journal: "Journal of Web Development",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    doi: "10.1000/183",
    authors: ["Alice Johnson", "Bob Brown"],
    year: 2021,
    journal: "Node.js Monthly",
  },
  {
    id: 3,
    title: "Express.js in Action",
    doi: "10.1000/184",
    authors: ["Charlie Davis"],
    year: 2019,
    journal: "Express Journal",
  },
];

const router = express.Router();

router.get("/publications", (req, res) => {
  console.log("Get /publications route called");
  res.json({ data: publications });
});

// Example of server-side rendering (commented out)
// router.get("/serverSide/", (req, res) => {
//   res.send(`<h1>Hola Mengyu</h1>
//     <h2>Publications</h2>
//     ${publications.map((pub) => `<div>${pub.title} <strong>${pub.journal}</strong></div> `).join("\n")}
//     `);
// });

export default router;
