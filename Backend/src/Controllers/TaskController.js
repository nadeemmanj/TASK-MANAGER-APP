import taskModel from "../Models/TaskModel.js"


// Create Task
export const createTask = async(req,res) =>{

    const data  = req.body;
    try {
        const model = new taskModel(data);
        await model.save();
        res.status(201).json({
            success: true,
            message: "task is created"
        })
        
    } catch (err) {
        res.status(500).json({
            success : false,
            message: "Failed to create task"
        })
    }
}



// Fetch all tasks
export const fetchAllTasks = async(req,res) =>{
    try {
        const data = await taskModel.find({});
        res.status(200).json({
            success: true,
            message: "All task fetched",
            data
        })
        
    } catch (err) {
        res.status(500).json({
            success : false,
            message: "not yet task"
        })
    }
}



// Update Tasks
export const updateTask = async(req,res) =>{
    try {
        
        const id = req.params.id;
        const data = req.body;    
        const obj = { $set: { ...data } }  
        await taskModel.findByIdAndUpdate(id,obj);
        res.status(200).json({
            success: true,
            message: "Update Task Successully",
        })
        
    } catch (err) {
        res.status(500).json({
            success : false,
            message: "not yet task"
        })
    }
}




// delete Tasks
export const deleteTask = async(req,res) =>{
    try {
        
        const id = req.params.id; 
        await taskModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Delete Task Successully",
        })
        
    } catch (err) {
        res.status(500).json({
            success : false,
            message: "not yet task"
        })
    }
}