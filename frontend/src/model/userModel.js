import axios from "axios";

export const register = async (userData)=>{
    return await axios.post('http://localhost:5001/staylux-a71c8/us-central1/api/auth/register',userData);
}

export const loginUser=async (uid)=>{
    return await axios.post('http://localhost:5001/staylux-a71c8/us-central1/api/auth/login',{uid});
}

export const googleLogin=async (email)=>{
     return await axios.post('http://localhost:5001/staylux-a71c8/us-central1/api/auth/google-login',{email});
}

export const updateUserReg =async(updateData)=>{
    return await axios.post('http://localhost:5001/staylux-a71c8/us-central1/api/auth/reg-update',updateData)
}