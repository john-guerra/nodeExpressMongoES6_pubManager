import express from "express";

import publicationsRouter from "./routes/publicationsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Initializing the backend server...");

app.use(express.static("frontend"));
app.use("/api", publicationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
