import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar.jsx";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";

import { MOVIE_CATEGORIES, ORGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants.js";
import { useContentStore } from "../../store/content.js";
import MovieSlider from "../../component/MovieSlider";
import { useState } from "react";

const HomeScreen = () => {
    const { trendingContent } = useGetTrendingContent();
    const { contentType } = useContentStore();

    const [imgLoading,setimgLoading]=useState(true);

    console.log(trendingContent);

    if (!trendingContent)
        return (
            <div className="h-screen text-white relative">
                <Navbar />
                <div className="w-full h-full left-0 top-0 absolute bg-black/70 flex items-center justify-center -z-10  shimmer " />
            </div>
        );

    return (
        <>
            <div className="h-screen relative  text-white ">
                <Navbar />
                {imgLoading && (
                     <div className="w-full h-full left-0 top-0 absolute bg-black/70 flex items-center justify-center -z-10  shimmer " />)
                }
                <img
                    src={ORGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
                    alt="hero-img"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-50" onLoad={()=>{setimgLoading(false)}}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden="true" />

                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:p-16 lg:px-32">
                    <div className="bg-gradient-to-b from-black via-transparent to to-transparent absolute w-full h-full top-0 left-0 -z-10" />

                    <div className="max-w-2xl ">
                        <h1 className="mt-4 text-6xl  text-balance font-extrabold">
                            {trendingContent?.title || trendingContent?.name}
                        </h1>
                        <p className="mt-2 text-lg">
                            {trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]}
                            {""} | {trendingContent?.adult ? "18+" : "PG-13 "}
                        </p>
                        <p className="mt-4 text-lg">
                            {trendingContent?.overview.length > 200
                                ? trendingContent?.overview.slice(0, 200) + "..."
                                : trendingContent?.overview}
                        </p>
                    </div>

                    <div className="mt-8  flex gap-3">
                        <Link
                            to={`/watch/${trendingContent?.id}`}
                            className="bg-white hover:bg-white/80 text-black px-4 py-2 flex items-center rounded-md text-lg font-medium
                  "
                        >
                            <Play className="size-6  mr-2 fill-black" /> Play
                        </Link>

                        <Link
                            to={`/watch/${trendingContent?.id}`}
                            className="bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 flex items-center rounded-md text-lg font-medium
                  "
                        >
                            <Info className="size-6  mr-2 " /> More
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10 py-10 bg-black">
                {contentType === "movie"
                    ? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
                    : TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
            </div>
        </>
    );
};

export default HomeScreen;
