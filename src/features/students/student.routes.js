import express from "express"
import StudentController from "./student.controller.js"
import {upload} from "./../../middlewares/fileupload.middleware.js"

const studentRouter = express.Router()

const studentController = new StudentController

studentRouter.get("/",(req,res)=>{
    studentController.getAllStudents(req,res)
})

//for file uploading
// studentRouter.post("/",upload.single("resume"),(req,res)=>{
//     studentController.addStudent(req,res)
// })

studentRouter.post("/",(req,res)=>{
    studentController.addStudent(req,res)
})
studentRouter.get("/:id",(req,res)=>{
    studentController.getOneStudent(req,res)
    
})
studentRouter.put("/:id",(req,res)=>{
    studentController.updateStudent(req,res)
})

export default studentRouter