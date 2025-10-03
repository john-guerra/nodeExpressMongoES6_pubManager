import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Initializing the backend server...");


app.use(express.static("frontend"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
