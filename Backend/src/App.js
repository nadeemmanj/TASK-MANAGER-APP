import express from "express"
import { config } from "dotenv";
import connectDB from "../src/config/db.js";
import TaskRouter from "./Routes/TaskRouter.js";
import bodyParser from "body-parser";
import cors from "cors"

// connect dotenv
config();



const app = express();


app.use(cors())
app.use(express.json())

app.use(bodyParser.json());

// connectdb
connectDB()




app.get("/", (req, res) => {
  res.send("Backend Running");
});


app.use("/tasks",TaskRouter);


export default app;