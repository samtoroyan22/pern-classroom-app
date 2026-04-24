import express from "express";
import subjectRouter from "./routes/subjects.js";
import cors from "cors";
import securityMiddleware from "./middleware/security.js";

const app = express();
const PORT = 8000;

// if not exsists .env then trhorw error
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined in .env file");
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(securityMiddleware);

app.use("/api/subjects", subjectRouter);

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the classroom API");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
