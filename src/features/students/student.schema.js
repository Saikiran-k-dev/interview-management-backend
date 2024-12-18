import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    batch: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Placed", "Not_placed"],
    },
    resume:{
        type:String
    },
    scores: {
        courses: 
            {
                dsafinalscore: { type: Number },
                reactfinalscore: { type: Number },
                webdfinalscore: { type: Number },
            },
        
    },
    interviews: [
        {
            interviewid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Interview", 
            },
        },
    ],
    results: {
        type: String,
        enum: ["PASS", "FAIL", "on-hold", "didnt-attempt"],
    },
});

export default studentSchema
