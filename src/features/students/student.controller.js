import StudentRepository from "./student.repository.js";


export default class StudentController{
    constructor(){
        this.studentRepository = new StudentRepository
    }

    async addStudent(req,res){
        try {
            const studentDetails = req.body
            studentDetails.resume = req.file.path
            const addStudent = await this.studentRepository.addStudent(studentDetails)
            return res.status(200).send(addStudent)
            
        } catch (error) {
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }
    async getAllStudents(req,res){
        try {
            const studentList = await this.studentRepository.getStudents()
            return res.status(200).send(studentList)
        } catch (error) {
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }
    async getOneStudent(req,res){
        try {
            const studentId = req.params.id
            const studentData = await this.studentRepository.getOneStudent(studentId)
            return res.status(200).send(studentData)
        } catch (error) {
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }

    async updateStudent(req,res){
        try {
            const studentId = req.params.id
            const updateDetails = req.body
            const updatedData = this.studentRepository.updateStudent(studentId,updateDetails)
            res.status(201).send(updateDetails)
        } catch (error) {
            console.log(error)
            res.status(500).send("something went wrong")
        } 
    }
}