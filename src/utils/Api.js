import { Password } from "@mui/icons-material";
import axios from "axios"
const BASE_URL=`http://localhost:8000/api/v1/`;

const getAuth =()=>{
    return `Bearer ${localStorage.getItem('token')}`
}

export const loginApiCall = async(payload,END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload,END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const forgotPasswordCall = async (payload,END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const resetPasswordCall = async (token,payload,END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`,payload,{
        headers:{
            Authorization: `Bearer ${token}`,
            
        }
    })
}


export const getAllNotesApiCall = async(END_POINT)=>{
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { headers:{
            Authorization:getAuth()
         }
         }
    )
}

export const craeteNoteApiCall = async(payload,END_POINT) => {
   return await axios.post(`${BASE_URL}${END_POINT}`,payload,{
    headers:{
        Authorization:getAuth()
    }
   })
}

export const archiveApiCall = async(END_POINT) => {
   return await axios.put(`${BASE_URL}${END_POINT}`,{},{
    headers:{
        Authorization:getAuth()
    }
   })
}

export const trashApiCall = async(END_POINT) => {
   return await axios.put(`${BASE_URL}${END_POINT}`,{},{
    headers:{
        Authorization:getAuth()
    }
   })
}

export const deleteApiCall = async(END_POINT) => {
   return await axios.delete(`${BASE_URL}${END_POINT}`,{
    headers:{
        Authorization:getAuth()
    }
   })
}

export const colourApiCall = async(END_POINT,payload) => {
   return await axios.put(`${BASE_URL}${END_POINT}`,payload,{
    headers:{
        Authorization:getAuth()
    }
   })
}

export const updateNotesApiCall = async(END_POINT,payload) => {
   return await axios.put(`${BASE_URL}${END_POINT}`,payload,{
    headers:{
        Authorization:getAuth()
    }
   })
}