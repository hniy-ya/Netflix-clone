import { User } from "../model/user.model.js";
import { fetchFromTmdb } from "../services/tmdb.service.js";


export async function searchPerson (req,res){

    const {query}=req.params;

    try {

        const response =await fetchFromTmdb(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length === 0){
        return res.status(404).send(null);
        }

        
        await User.findOneAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date()
                },
            },
        })

res.status(200).json({succses:true,content:response.results})
    
    
        
    } catch (error) {
        console.log("Error in SearchPerson controller"+error.message);
        res.status(500).json({succses:false,message:"Internal Server Error"})
        
        
    }
}

export async function searchMovie (req,res){

    const {query}=req.params

    try {

        const response =await fetchFromTmdb(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length===0){
        return res.status(404).send(null);
        }


        await User.findOneAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"movie",
                    createdAt:new Date()

                }
            }
        }
        )
res.status(200).json({succses:true,content:response.results})
        
    } catch (error) {
        console.log("Error in SearchMovie controller"+error.message);
        res.status(500).json({succses:false,message:"Internal Server Error"})
    }
}

export async function searchTv(req,res){

    const {query}=req.params;

    try {

        const response =await fetchFromTmdb(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length===0){
        return res.status(404).send(null);
        }


        
        await User.findOneAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt:new Date()

                }
            }
        }
        )
res.json({succses:true,content:response.results})
        
    
        
    } catch (error) {

        console.log("Error in SearchTv controller"+error.message);
        res.status(500).json({succses:false,message:"Internal Server Error"})
        
    }


    
}


export async function getSearchHistory(req,res){




    try {

      const history=  await User.findOneAndUpdate(req.user.searchHistory)
        res.status(200).json({succses:true,content:history.searchHistory})
    } catch (error) {
        res.status(500).json({succses:false,message:'Internal Server Error'})
        
    }

}


export async function removeItemFromSearchHistory(req,res){

    let  {id}=req.params;

    id=parseInt(id)

    try {
        await User.findOneAndUpdate(req.user._id,
            {
        $pull:{
            searchHistory:{id:id}

        },
            }
        );

        res.status(200).json({succses:true,message:"Item Removed from searchHistory"})
        
    } catch (error) {
        console.log("Error In removeitemfromsearchhistort "+error.message);
        res.status(500).json({succses:false,message:"Internal Server Error"})
        
    }

}

