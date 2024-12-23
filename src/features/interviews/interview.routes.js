import express from "express"
import InterviewController from "./interview.controller.js"

const interviewRouter = express.Router()

const interviewController = new InterviewController

interviewRouter.get("/",(req,res)=>{
    interviewController.getAll(req,res)
})

interviewRouter.get("/:id",(req,res)=>{
    interviewController.getInterview(req,res)
})

interviewRouter.post("/",(req,res)=>{
    interviewController.addNewInterview(req,res)
})

interviewRouter.put("/:id",(req,res)=>{
    interviewController.updateInterview(req,res)
})

interviewRouter.delete(":/id",(req,res)=>{
    interviewController.deleteInterview(req,res)
})

interviewRouter.put("/:id",(req,res)=>{
    interviewController.addStudentToInterview(req,res)
})

export default interviewRouter