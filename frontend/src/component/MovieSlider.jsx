import { useEffect, useState } from "react"
import { useContentStore } from "../store/content"
import axios from "axios"
import { Link } from "react-router-dom"
import { SMALL_IMG_BASE_URL } from "../utils/constants"


const MovieSlider = ({category}) => {
    const{contentType}=useContentStore()
    const {content,setContent}=useState([])


    
    const formattedContentType=contentType==="movie"?"Movie":"Tv Shows"
    const formattedContentName=category.replaceAll("_"," ")[0].toUpperCase() +category.replaceAll("_"," ").slice(1)


    

    useEffect(()=>{
      const getContent=async()=>{
       const res=await axios.get(`/api/v1/${contentType}/${category}`)
       setContent(res.data.content)

       console.log(res.data);
       

    
       
        
      }
      getContent();
    },[contentType,category])

    
  return (
    <div className="text-white bg-black px-5 md:px-20">
        <h2> {formattedContentName} {formattedContentType}</h2>

        <div className="flex space-x-4">
          {content.map((item)=>(
           <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className="rounded-lg overflow-hidden">
              <img src={SMALL_IMG_BASE_URL+ item.backdrop_path} alt="movie image" className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
            </div>

           </Link>
          ))}
        </div>

    </div>
  )
}

export default MovieSlider
