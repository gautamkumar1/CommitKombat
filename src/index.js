import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";
dotenv.config();
const app = express();
import githubStatusRoutes from "./routes/github-status-routes.js";
import scoreRoutes from "./routes/score-routes.js";

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
const PORT = process.env.PORT || 3000;
app.get("/", (_, res) => {
  res.send("Hello from server");
});
app.use("/api/v1", githubStatusRoutes);
app.use("/api/v1", scoreRoutes);

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})