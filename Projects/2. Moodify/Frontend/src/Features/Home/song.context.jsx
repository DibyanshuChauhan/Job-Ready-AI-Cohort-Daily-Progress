/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({
    "url": "https://ik.imagekit.io/4dxhabhfm/cohort-2/moodify/songs/Jatt_Mehkma__RiskyjaTT.CoM__M9NUJgWZ_.mp3",
    "posterUrl": "https://ik.imagekit.io/4dxhabhfm/cohort-2/moodify/posters/Jatt_Mehkma__RiskyjaTT.CoM__42AefYWUW.jpeg",
    "title": "Jatt Mehkma (RiskyjaTT.CoM)",
    "mood": "happy",
    })

    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    )
};
