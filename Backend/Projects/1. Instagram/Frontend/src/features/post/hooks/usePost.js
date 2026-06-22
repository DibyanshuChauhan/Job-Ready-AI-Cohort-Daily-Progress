import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext)

    const { Loading, setLoading, Post, Feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }
    return {
        Loading, Feed, Post, handleGetFeed
    }
}