
import toast from 'react-hot-toast';
import {create} from 'zustand'
import api from '../lib/axios.js';


export const useAuthStore=create(
   
    (set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:false,
    isLoggingOut:false,
    isLogingIn:false,
    signup:async(credentials)=>{
        set({isSigningUp:true})
        try {
            const response= await api.post('/auth/signup',credentials);
            set({user:response.data.user,isSigningUp:false});
            toast.success("Account created successfully")
        } catch (error) {
           toast.error(error.response.data.message ||"An error occurred")
        
           
           set({isSigningUp:false,user:null})
            
        }

    },
    login:async(credentials)=>{
        set({isLogingIn:true})
        try {
            const response= await api.post('/auth/login',credentials);
            set({user:response.data.user,isLogingIn:false});
            toast.success("Login In successfully")
            
        } catch (error) {
            toast.error(error.response.data.message ||"An error occurred")
        
           
            set({isLogingIn:false,user:null})
             
            
        }
    },
    logout:async()=>{
        set({isLoggingOut:true})

        try {
            const response=await api.post("/auth/logout");
            set({user:response.data.user,isLoggingOut:false});
            toast.success("Logged out successfully")

        } catch (error) {
            toast.error(error.response.data.message ||"Logout Failed")
            set({isLoggingOut:false,user:null})
            
        }
    },

    authCheck:async ()=>{
        set({ isCheckingAuth:true})
         try {
             const response =await api.get("/auth/authcheck");
             set({isCheckingAuth:false,user:response.data.user});
 
             
         } catch (error){
             set({isCheckingAuth:false,user:null})
             toast.error(error.response.data.message ||"An error occurred")
         
            
          
 
             
         }
     }


}


    
    ))

