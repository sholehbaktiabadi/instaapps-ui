import { useEffect, useState } from "react";
import PostCard from "../component/postcard";
import { PostData } from "../interface/post";
import { InstaApi } from "../api";
import { useCookies } from "react-cookie";

export function Home() {
    
    const [ posts, setPosts ] = useState<PostData[]>([])
    const [cookies] = useCookies(['token'])

    const fetchPosts = async () => {
        const res = await InstaApi.getPosts(cookies.token)
        try {
            const response = res.data
            setPosts(response.data)
        } catch (error) {
            // TODO - add error handler
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchPosts()
    },[])

    return (
        <>
            <PostCard posts={posts} />
        </>
    )
}