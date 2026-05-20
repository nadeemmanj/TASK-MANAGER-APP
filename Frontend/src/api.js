import { API_URL } from "./utils.js";


export const CreateTask = async (taskobj) =>{
    const url = `${API_URL}/tasks`;
    const options = {
        method: "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(taskobj)
    };
    try {

        const result = await fetch(url,options);

        const data = await result.json();

        return data;
    }

     catch (error) {

        return error;
    } 
}





export const GetAllTasks = async () =>{
    const url = `${API_URL}/tasks`;
    const options = {
        method: "GET",
        headers : {
            'Content-Type' : 'application/json'
        }
    };
    try {

        const result = await fetch(url,options);

        const data = await result.json();

        return data;
    }

     catch (error) {

        return error;
    } 
}






export const DeleteTaskById = async (id) =>{
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: "DELETE",
        headers : {
            'Content-Type' : 'application/json'
        }
    };
    try {

        const result = await fetch(url,options);

        const data = await result.json();

        return data;
    }

     catch (error) {

        return error;
    } 
}






export const UpdateTaskById = async (id,reqBody) =>{
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: "PUT",
        headers : {
            'Content-Type' : 'application/json'
        },

        body: JSON.stringify(reqBody)
        
    };
    try {

        const result = await fetch(url,options);

        const data = await result.json();

        return data;
    }

     catch (error) {

        return error;
    } 
}


  