import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
});


const taskModel = mongoose.model("todos", taskSchema);

export default taskModel;