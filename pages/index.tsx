import axios from "axios"
import {Video} from"../types"
import VideoCard from "../components/VideoCard"
import NoResults from "../components/NoResults"
import { BASE_URL } from "../utils"

//Interface is a object
interface IProps{
  videos:Video[]//This is a array of video and a we have make a type of single video 
}

const Home=({videos}:IProps)=>{
  console.log(videos)
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video:Video)=>(
          <VideoCard post={video} key={video._id}/>
        ))
      ):(
        <NoResults text={"No Videos"}/>
      )}
    </div>
  ) 
}

//In next js we can make our fully backend server in api folder.
export const getServerSideProps=async()=>{
  //GET call for fecthing the videos from server to be render.
  const {data}=await axios.get(`${BASE_URL}/api/post`);//destructuring the response in data.
  return{
    props:{
      videos:data
    }
  }
}

export default Home