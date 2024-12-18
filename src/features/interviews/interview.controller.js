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
}