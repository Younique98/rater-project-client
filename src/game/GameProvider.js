import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameCategories, setCategories ] = useState([])



    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
                
            }
        })
        .then(response => response.json())
        .then(setGames)
        .then(console.log(games, "games loaded"))
    }


    const createGame = (game) => {
        return fetch("http://localhost:8000/games", { 
        method: "POST",    
        headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then(getGames)
    }

    const getGameById = (id) => {
        return fetch(`http://localhost:8000/games/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
    }

    const DeleteGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method: "DELETE"
        })
            .then(getGames)
    }
    const getGameCategories = () => {
        return fetch("http://localhost:8000/category", { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const leaveGame = gameId => {
        return fetch(`http://localhost:8000/games/${ gameId }/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(getGames)
    }

    const joinGame = gameId => {
        return fetch(`http://localhost:8000/games/${ gameId }/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(getGames)
    }

    const updateGame = game => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    return (
        <GameContext.Provider value={{ games, getGames, updateGame, createGame, getGameById, getGameCategories, gameCategories, DeleteGame, joinGame, leaveGame }} >
            { props.children }
        </GameContext.Provider>
    )
}