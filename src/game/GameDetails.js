import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameProvider";
import "./Game.css";

export const GameDetails = (props) => {
  const {
    DeleteGame,
    getGameById,
    getGameCategories,
    gameCategories,
    games,
    getGames
  } = useContext(GameContext);

  const [game, setGame] = useState({});

  useEffect(() => {
    const gameId = parseInt(props.match.params.gameId);
    getGameById(gameId).then(setGame);
  }, []);

  useEffect(() => {
    getGameCategories();
    getGames()
  }, []);
  return (
    <section className="gameDetail">
      {/* {console.log(game)} */}
      <h1 className="gameName">{game.title}</h1>
      <div className="bodyOfGameDetails">
      <div className="gameDetail__description">Description: {game.description}</div>
      <div className="gameDetail__yearReleased">
        Year Released: {game.year_released}
      </div>
      <div className="gameDetail__timeToPlay">
        Estimated Time To Play: {game.estimated_time_to_play}
      </div>
      <div className="gameDetail__numberOfPlayers">
        Number Of Players: {game.number_of_players}
      </div>
      <div className="gameDetail__ageRecommendation">
        Age Recommendation: {game.age_recommendation}
      </div>
      <div className="gameDetail__ageRecommendation">
        Age Recommendation: {game.category_id}
      </div>
      <div className="gameDetail__designer">Designer: {game.designer}</div>
      {/* <div className="game__category">
        {gameCategories.map((category) => {
          console.log(category)
          // category = id: 1, category: "Strategy
          games.map((currentGame) => {
            console.log(currentGame)
            const gamedisplayed = currentGame.category_id === category.id || {}
            console.log(gamedisplayed);
            return (
              <div key={category.id} className="category">
              <div>{category.category}</div>
              </div>
              );
            });
          })}
        </div> */}

        <button
          onClick={() => {
            props.history.push(`/gamereview/new`);
          }}
        >
          Write A Review
        </button>
      <button
        onClick={() =>
          DeleteGame(game.id).then(() => props.history.push("/"))
        }
      >
        Release game
      </button>

      <button
        onClick={() => {
          props.history.push(`/games/edit/${game.id}`);
        }}
      >
        Edit
      </button>
      </div>
    </section>
  );
};
