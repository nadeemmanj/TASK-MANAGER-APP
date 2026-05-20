import React, { useEffect, useState } from 'react'
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from "react-icons/fa"
import { ToastContainer } from 'react-toastify'
import {CreateTask, GetAllTasks, DeleteTaskById, UpdateTaskById} from "./api.js"
import { notify } from './utils.js'



function TakManager() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTask,setCopyTask] = useState([]);
  const [updateTask,setUpdateTask] = useState(null);



  // handle + button
  const handleTask = () => {
    if(updateTask && input){
      
      // update API call
      const obj ={
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id
      }

      handleUpdateTask(obj);
    
    } else if (updateTask === null && input){
      // create API call
      handleAddInput();
    }
  }



  // handle side effect
  useEffect(() => {
    if(updateTask){
      setInput(updateTask.taskName)
    }
  },[updateTask])




  // create task
  const handleAddInput  = async () => {
    const obj = {
      taskName: input,
      isDone: false
    }
    try {
      const {success,message} = await CreateTask(obj)

      if(success){
        // show success toast
          notify(message, "success")
      }else{
        // show error toast
          notify(message, "error")
      }

      
      setInput("")
      fetchAllTasks()
      
    } catch (err) {
      console.error(err)
        notify("Failed to create task", "error")
    }
      
  }



  // fetch all tasks

  const fetchAllTasks = async() =>{

    try {
      const {data} = await GetAllTasks();

      setTasks(data)
      setCopyTask(data)
      
    } catch (err) {
      console.error(err)
        notify("Failed to create task", "error")
    }

  }



  useEffect(() => {
        fetchAllTasks()
  },[])





  //handle delete task

  const handleDeleteById = async (id) =>{

  
    try {
      const {success,message} = await DeleteTaskById(id)

      if(success){
        // show success toast
          notify(message, "success")
      }else{
        // show error toast
          notify(message, "error")
      }

      fetchAllTasks()

    } catch (err) {
      console.error(err)
        notify("Failed to Delete task", "error")
    }
      
       
  }
  



  // handle check & uncheck task

  const handleCheckAndUncheck = async(item) => {

      const {_id, taskName,isDone} = item;

    const obj = {
      taskName,
      isDone: !isDone
    }

    try {
      const {success,message} = await UpdateTaskById(_id, obj)

      if(success){
        // show success toast
          notify(message, "success")
      }else{
        // show error toast
          notify(message, "error")
      }

      fetchAllTasks()

    } catch (err) {
      console.error(err)
        notify("Failed to Update task", "error")
    }
    
  }





  // handle update task

  const handleUpdateTask = async (item) => {
    const {_id, taskName,isDone} = item;

    const obj = {
      taskName,
      isDone: isDone
    }

    try { 
      const {success,message} = await UpdateTaskById(_id, obj)

      if(success){
        // show success toast
          notify(message, "success")
      }else{
        // show error toast
          notify(message, "error")
      }

      setInput("")
      fetchAllTasks()
      setUpdateTask(null)

    } catch (err) {
      console.error(err)
        notify("Failed to Update task", "error")
    }
    
  }



  // handle search input

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTask = [...copyTask];
    const result = oldTask.filter((item) =>item.taskName.toLowerCase().includes(term))
    setTasks(result)
    
  }





  return (

    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
        <div className="max-w-3xl mx-auto">


        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Task Manager
          </h1>

          <p className="text-gray-300 text-sm md:text-base">
            Organize your daily tasks efficiently 🚀
          </p>
        </div>


        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-4 md:p-6">


          {/* Input + Search */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">


            {/* Add Task */}
            <div className="flex flex-1 gap-2">



              <input
                type="text"
                value={input}
                placeholder="Add new task..."
                className="flex-1 border border-gray-600 bg-white/20 text-white placeholder:text-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />



              <button
                onClick={handleTask}
                className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white px-5 rounded-xl cursor-pointer flex items-center justify-center shadow-lg"
              >
                <FaPlus />
              </button>
            </div>



            {/* Search */}
            <div className="flex items-center border border-gray-600 bg-white/20 rounded-xl overflow-hidden w-full lg:w-72">

              <span className="px-4 text-gray-300">
                <FaSearch />
              </span>

              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent text-white placeholder:text-gray-300 outline-none w-full py-3 pr-3"
              />
            </div>
          </div>




          {/* Task List */}
          <div className="space-y-4">

            {
              tasks.map((item, id) => (
                <div
                  key={id}
                  className="bg-white/10 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:scale-[1.01] transition-all duration-300"
                >



                  {/* Task Name */}
                  <div className="flex items-center gap-3 break-all">

                    <div className={`w-3 h-3 rounded-full ${item.isDone ? "bg-green-500" : "bg-yellow-400"}`}></div>

                    <span
                      className={`text-sm md:text-base ${
                        item.isDone
                          ? "line-through text-gray-50"
                          : "text-white"
                      }`}
                    >
                      {item.taskName}
                    </span>
                  </div>

                  
                  
                  {/* Buttons */}
                  <div className="flex items-center gap-2 justify-end">

                  
                    {/* Complete */}
                    <button
                      onClick={() => handleCheckAndUncheck(item)}
                      type="button"
                      className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white p-3 rounded-xl shadow-md cursor-pointer"
                    >
                      <FaCheck />
                    </button>



                    {/* Edit */}
                    <button
                      onClick={() => setUpdateTask(item)}
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white p-3 rounded-xl shadow-md cursor-pointer"
                    >
                      <FaPencilAlt />
                    </button>



                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteById(item._id)}
                      type="button"
                      className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white p-3 rounded-xl shadow-md cursor-pointer"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </div>
              ))
            }

      </div>

          

            {/* Empty State */}
            {
              tasks.length === 0 && (
                <div className="text-center py-10">
                  <h2 className="text-xl text-gray-300 mb-2">
                    No Tasks Found
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Add your first task to get started ✨
                  </p>
                </div>
              )
            }

          </div>
        </div>


            {/* Toastify */}

            <ToastContainer
                  position='top-right'
                  autoClose = {3000}
                  hideProgressBar = {false}
            
            />


    </div>
  )
}

export default TakManager;