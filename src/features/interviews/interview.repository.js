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
    
            const studentUpdate = await StudentModel.updateOne(
                { _id: studentId, 'interviews': { $ne: interviewId } },
                { $push: { interviews: new ObjectId(interviewId) } } 
            );
    
            const interviewUpdate = await InterviewModel.updateOne(
                { _id: interviewId, 'students': { $ne: studentId } },  
                { $push: { students: new ObjectId(studentId) } } 
            );
    
            if (studentUpdate.nModified === 0 || interviewUpdate.nModified === 0) {
                throw new Error("Student or Interview was not updated");
            }
    
            return { message: "Student added to interview successfully" };
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong while adding student to interview");
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
            const interview = await InterviewModel.findById(interviewid);
            if (!interview) {
                throw new Error("Interview not found");
            }
    
            await StudentModel.updateMany(
                { _id: { $in: interview.students } },
                { $pull: { interviews: interviewid } }
            );
    
            await InterviewModel.deleteOne({ _id: interviewid });
    
            return "Successfully deleted interview and references";
        } catch (error) {
            throw new Error("Something went wrong");
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

    async getAll(){
        try {
            const interviews = await InterviewModel.find()
            return interviews
        } catch (error) {
            throw new Error(`Error updating Interview: ${error.message}`);
        }
    }


}