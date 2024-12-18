import dotenv from "dotenv"
dotenv.config()
import express from "express"
import bodyParser from "body-parser";
import path from "path"

import { connectMongodbUsingMongoose } from "./src/config/mongoose.js"
import studentRouter from "./src/features/students/student.routes.js"
import interviewRouter from "./src/features/interviews/interview.routes.js";


const server = express()
server.use(bodyParser.json());
server.use(express.static(path.join(path.resolve("public"))))

server.use("/api/student",studentRouter)
server.use("/api/interview",interviewRouter)

server.listen(3000, async () => {
    await connectMongodbUsingMongoose();
    console.log("Server is listening at port 3000");
});