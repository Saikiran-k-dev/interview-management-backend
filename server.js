import dotenv from "dotenv"
dotenv.config()
import express from "express"
import bodyParser from "body-parser";
import path from "path"

import { connectMongodbUsingMongoose } from "./src/config/mongoose.js"
import studentRouter from "./src/features/students/student.routes.js"
import interviewRouter from "./src/features/interviews/interview.routes.js";
import userRouter from "./src/features/users/user.route.js";



const server = express()
server.use(bodyParser.json());
server.use(express.static(path.join(path.resolve("public"))))

server.use("/api/student",studentRouter)
server.use("/api/interview",interviewRouter)
server.use("/api/user",userRouter)

server.use((req,res,next)=>{
    res.send("there is no such method")
    
    const error = new Error("There is no such method");
    error.status = 404;
    next(error);
})

server.use((error, req, res, next) => {
    console.error(error.stack);

    res.status(error.status || 500).json({
        message: error.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error : {}
    });
});

server.listen(3000, async () => {
    await connectMongodbUsingMongoose();
    console.log("Server is listening at port 3000");
});