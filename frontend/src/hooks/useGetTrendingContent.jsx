
import { useEffect, useState } from "react"
import { useContentStore } from "../store/content"
import api from "../lib/axios.js"


const useGetTrendingContent = () => {

  const [trendingContent,setTrendingContent]=useState(null)
  const {contentType}=useContentStore()

  useEffect(()=>{
    const getTrendingContent=async()=>{
      const res=await api.get(`/${contentType}/trending`)
      setTrendingContent(res.data.content)
      
    }
    getTrendingContent();
  },[contentType])
  return {
  trendingContent
}
}

export default useGetTrendingContent
