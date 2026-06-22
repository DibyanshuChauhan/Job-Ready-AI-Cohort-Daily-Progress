/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {

    const [Loading, setLoading] = useState(false)
    const [Post, setPost] = useState(null)
    const [Feed, setFeed] = useState(null)

    return (
        <PostContext.Provider value={{ Loading, setLoading, Post, setPost, Feed, setFeed }}>
            {children}
        </PostContext.Provider>
    )
}