import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
const LoginPge = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const{login}=useAuthStore()


    const handleSignIn=(e=>{
        e.preventDefault();
        login({email,password})
       
        
    })
  return (
    <div className="h-screen w-full hero-bg">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link to={'/'}>
            <img src="netflix-logo.png" alt="logo" className="w-52" />
            </Link>
        </header>

        <div className="flex justify-center items-center mt-20 mx-3">
            <div className="w-full max-w-md  p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                <h1 className="text-white text-center text-2xl font-bold mb-4">Sign In</h1>

                <form action="" className="space-y-4" onSubmit={handleSignIn}>
                    <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                    <input type="email" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" placeholder="your@gmail.com" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                    </div>

                  

                    <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
                    <input type="password" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" placeholder="*******" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </div>
                <button className="w-full bg-red-600 py-2 text-white rounded-md hover:bg-red-700 font-semibold">Signup</button>

             
                </form>

                <div className="text-gray-400 text-center">Don't have an account?{" "}
                    <Link to={'/signup'} className="text-red-400 hover:underline">Sign Up</Link> </div>
            </div>
        </div>
   
      
    </div>
  )
}

export default LoginPge;
