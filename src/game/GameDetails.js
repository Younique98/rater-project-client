import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider"
import "./Game.css"

export const GameDetails = (props) => {
    const { DeleteGame, getGameById } = useContext(GameContext)

    const [game, setGame] = useState({ location: {}, customer: {} })

    useEffect(() => {
        const gameId = parseInt(props.match.params.gameId)
        getGameById(gameId)
            .then(setGame)
    }, [])

    return (
        <section className="game">
            {console.log(game)}
            <h3 className="game__title">Title: {game.title}</h3>
            <div className="game__description">Description: {game.description}</div>
            <div className="game__yearReleased">Year Released: {game.yearReleased}</div>
            <div className="game__timeToPlay">Estimated Time To Play: {game.estimatedTimeToPlay}</div>
            <div className="game__numberOfPlayers">Number Of Players: {game.numberOfPlayers}</div>
            <div className="game__ageRecommendation">Age Recommendation: {game.ageRecommendation}</div>
            <div className="game__designer">Designer: {game.designer}</div>
            <div className="game__category">Category: {game.category}</div>

            <button onClick={() => DeleteGame(game.id).then(() => props.history.push("/games"))} >Release game</button>

            <button onClick={() => {
                props.history.push(`/games/edit/${game.id}`)
            }}>Edit</button>
        </section>
    )
}