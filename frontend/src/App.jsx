
import { Routes,Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPge from "./pages/LoginPge.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Footer from "./component/Footer.jsx";
import WatchPage from "./pages/WatchPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SearchHistoryPage from "./pages/HistoryPage.jsx";
import NotFoundPage from "./pages/404Page.jsx";



function App() {
  const {user,isCheckingAuth,authCheck}=useAuthStore();
  console.log("user",user);
  

  useEffect(()=>{
    authCheck();
   
  },[authCheck])

  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    );
  }

  
 

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={ !user?<SignUpPage/>:<Navigate to={'/'}/>}/>
      <Route path="/login" element={!user?<LoginPge/>:<Navigate to={'/'}/>}/>
       <Route path="/watch/:id" element={user?<WatchPage/>:<Navigate to={'/login'}/>}/>
     
            <Route path="/search" element={user?<SearchPage/>:<Navigate to={'/login'}/>}/>
            <Route path="/history" element={user?<SearchHistoryPage/>:<Navigate to={'/login'}/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
     
    </Routes>
    <Toaster />
    <Footer/>
    </>
  
  );
}

export default App;
