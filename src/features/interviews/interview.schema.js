import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
    companyName:{
        type:String
    },
    jobTitle:{
        type:String
    },
    description:{
        type:String
    },
    interviewLocation:{
        type:String
    },
    interviewDate:{
        type:Date
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }]
})

export default interviewSchema