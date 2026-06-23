import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
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

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true);

        const data = await createPost(imageFile, caption);

        setFeed(prevFeed => [
            data.post,
            ...(prevFeed || [])
        ]);

        setLoading(false);
    }

    const handleLike = async (Post) => {
        await likePost(Post)
        await handleGetFeed()
    }

    const handleUnlike = async (Post) => {
        await unLikePost(Post)
        await handleGetFeed()
    }

    useEffect(() => {
        handleGetFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        Loading, Feed, Post, handleGetFeed, handleCreatePost, handleLike, handleUnlike
    }
}