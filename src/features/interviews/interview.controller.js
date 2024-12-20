import InterviewRepository from "./interview.repository.js";


export default class InterviewController{
    constructor(){
        this.interviewRepository = new InterviewRepository
    }

    async addNewInterview(req,res){
        try {
            const interviewDetails = req.body
            const addInterview = await this.interviewRepository.addInterview(interviewDetails)
            res.status(200).send(addInterview)
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    }

    async getInterview(req,res){
        try {
            const interviewId = req.params.id
            const interview = await this.interviewRepository.getOneInterview(interviewId)
            res.status(200).send(interview)
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    }

    async getAll(req,res){
        try {
            const interviews = await this.interviewRepository.getAll()
            res.status(200).send(interviews)
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    }

    async addStudentToInterview(req,res){
        try {
            const studentId = req.query.studentId
            const interviewId = req.params.id
            const added = await this.interviewRepository.addStudentToInterview(studentId,interviewId)
            res.status(201).send(added.message)
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    }

    async updateInterview(req,res){
        try {
            const interviewId = req.params.id
            const updatedDetails = req.body
            const updatedInterview = await this.interviewRepository.updateInterview(interviewId,updatedDetails)
            res.status(201).send(updatedInterview)
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    }

    async deleteInterview(req,res){
        try {
            const interviewId = req.params.id
            const deleted = await this.interviewRepository.deleteInterview(interviewId)
            res.status(200).send(deleted)
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    }
}