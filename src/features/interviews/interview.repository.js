import mongoose from "mongoose"
import { ObjectId } from "mongodb"

import interviewSchema from "./interview.schema.js"
import studentSchema from "../students/student.schema.js"

const StudentModel = mongoose.model("Student",studentSchema)
const InterviewModel = mongoose.model("Interciew",interviewSchema)

export default class InterviewRepository{
    constructor(){

    }

    async addInterview(interviewDetails){
        try {
            const newInterview = new InterviewModel(interviewDetails)
            await newInterview.save()
            return newInterview
        } catch (error) {
           throw new Error("something went wrong");
           
        }
    }

    async addStudentToInterview(studentId,interviewId){
        try {
            const student = await StudentModel.findById(studentId);
            const interview = await InterviewModel.findById(interviewId);
            if (!student || !interview) {
                throw new Error("Student or Interview not found");
            }
            if (interview.students.includes(studentId)) {
                throw new Error("Student is already assigned to this interview");
            }
            student.interviews.push(new ObjectId(interviewId));
            await student.save();
            interview.students.push(new ObjectId(studentId));
            await interview.save()
            return { message: "Student added to interview successfully" };

        } catch (error) {
            throw new Error("something went wrong"); 
        }
    }

    async getOneInterview(interviewId){
        try {
            const interview = await InterviewModel.findById(interviewId)
            return interview
        } catch (error) {
            throw new Error("something went wrong");
            
        }


    }

    async deleteInterview(interviewid){

        try {
            await InterviewModel.deleteOne({_id:new ObjectId(interviewid)})
            return "successfully deleted"
        } catch (error) {
            throw new Error("something went wrong");
            
        }
    }

    async updateInterview(interviewId, updateDetails) {
        try {
            console.log(updateDetails)
            if (Object.keys(updateDetails).length === 0) {
                throw new Error("No fields to update");
            }
            const updatedInterview = await InterviewModel.findByIdAndUpdate(
                interviewId, 
                updateDetails,
                { new: true, runValidators: true } 
            );
    
            if (!updatedInterview) {
                throw new Error(" not found");
            }
            return updatedInterview;
        } catch (error) {
            throw new Error(`Error updating Interview: ${error.message}`);
        }
    }



}