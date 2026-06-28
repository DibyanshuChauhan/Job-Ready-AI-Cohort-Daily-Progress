import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)

    const { song, setSong, loading, setLoading } = context

    const handleGetSong = async ({ mood }) => {
        setLoading(true)
        const data = await getSong({ mood });
        setSong(data.song)
        setLoading(false)
    }

    return ({
        loading,song,handleGetSong
    })
}