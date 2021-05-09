import React, { useContext, useEffect} from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from 'react-router-dom'

export const GameList = (props) => {
  const { games, getGames, getGameCategories, joinGame, leaveGame, gameCategories } = useContext(GameContext);

    const history = useHistory();

  useEffect(() => {
    getGames();
    getGameCategories();
  }, []);

  return (
    <article className="gameHolder">
    <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      <article className="games">
      {
      games.map(game => {     
        console.log(game)
        return <section key={game.id} className="game">
          <div className="individualGames">
          
            <div className="game__title">
              Name of the Game: {game.title}
            </div>
            <div className="game__description">
              Description of the Game: {game.description}
            </div>
            <div className="game__released">
             Year Game Released: {game.year_released}
            </div>
            <div className="game__playTime">
              How much time does players need to beat this game? {game.estimated_time_to_play}
            </div>
            <div className="game__numberOfPlayers">
              How many players needed? {game.number_of_players}
            </div>
            <div className="game__ageRec">
              What should the age be of the players? {game.age_recommendation}
            </div>
        </div>
        {
                            game.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveGame(game.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinGame(game.id)}
                                    >Join</button>
                        }
          </section>;
      })
      }
      </article>
     </article>
  );
};
