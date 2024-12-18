import mongoose from "mongoose";
import studentSchema from "./student.schema.js";

const StudentModel = mongoose.model("Student",studentSchema)

export default class StudentRepository{
    constructor(){
    }

    async addStudent(studentDetails) {
        try {
            const newStudent = new StudentModel(studentDetails);
            await newStudent.save();
            return newStudent;
        } catch (error) {
            throw new Error(`Error adding student: ${error.message}`);
        }
    }
    async getStudents(){
        try {
            const studentDetails = await StudentModel.find().populate("interviews")
            if(!studentDetails.length){
                throw new Error("no record found")
            }
            return studentDetails
        } catch (error) {
            throw new Error(`Error adding student: ${error.message}`);
        }
    }

    async getOneStudent(studentId){
        try {
            const isStudentPresent =await StudentModel.findById(studentId).populate("interviews")
            if(isStudentPresent){
                return isStudentPresent
            }
            throw new Error("there is no such student")
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateStudent(studentId, updateDetails) {
        try {
            console.log(updateDetails)
            if (Object.keys(updateDetails).length === 0) {
                throw new Error("No fields to update");
            }
            const updatedStudent = await StudentModel.findByIdAndUpdate(
                studentId, 
                updateDetails,
                { new: true, runValidators: true } 
            );
    
            if (!updatedStudent) {
                throw new Error("Student not found");
            }
            return updatedStudent;
        } catch (error) {
            throw new Error(`Error updating student: ${error.message}`);
        }
    }
    
}