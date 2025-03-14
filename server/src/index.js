import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";
dotenv.config();
const app = express();
import githubStatusRoutes from "./routes/github-status-routes.js";
import scoreRoutes from "./routes/score-routes.js";
import rankRoutes from "./routes/rank-routes.js";
import aiRoutes from "./routes/ai-routes.js";
import mainRoutes from "./routes/main-routes.js";
import cors from "cors";
const corsOptions = {
  origin: [process.env.FRONTEND_URL], 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
};
app.use(cors(corsOptions));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
const PORT = process.env.PORT || 3000;
app.get("/", (_, res) => {
  res.send("Hello from server");
});
app.use("/api/v1", githubStatusRoutes);
app.use("/api/v1", scoreRoutes);
app.use("/api/v1", rankRoutes);
app.use("/api/v1", aiRoutes);
app.use("/api/v1", mainRoutes);
const keepAlive = () => {
  const url = 'https://commitkombat-2.onrender.com';
  setInterval(async () => {
    try {
      const response = await fetch(url);
      console.log('Keep-alive ping sent, status:', response.status);
    } catch (error) {
      console.error('Keep-alive ping failed:', error);
    }
  }, 840000); // 14 minutes
}
keepAlive();
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})