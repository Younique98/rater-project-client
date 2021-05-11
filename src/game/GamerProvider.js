import React, { useState } from "react"

export const GamerContext = React.createContext()

export const GamerProvider = (props) => {
    const [ gamer, setGamer ] = useState([])



    const getGamer = () => {
        return fetch("http://localhost:8000/gamers", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGamer)
    }


    const getGamerById = (id) => {
        return fetch(`http://localhost:8000/gamers/${id}`)
            .then(res => res.json())
    }

    return (
        <GamerContext.Provider value={{ getGamer, getGamerById, gamer }} >
            { props.children }
        </GamerContext.Provider>
    )
}