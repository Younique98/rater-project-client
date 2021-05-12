import React, { useContext, useEffect} from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"

export const GameList = (props) => {
  const { games, getGames, getGameCategories, joinGame, leaveGame } = useContext(GameContext);

    const history = useHistory();

  useEffect(() => {
    getGames()
    .then(getGameCategories);
  }, []);

  return (
    <article className="gameHolder">
       <h1 className="raterGameTitle">Rater Gamer</h1>
    <div className="registrationButton">
    <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      </div>
      <article className="games">
      {
      games.map(game => {     
        return <section key={game.id} className="game">
          <div className="individualGames">
          
            <div className="game__title">
              <Link to={`/games/${game.id}`}>
                {game.title}
              </Link>
              
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
        <div className="gameButtons">
        {
                            game.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveGame(game.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinGame(game.id)}
                                    >Follow</button>
                        }
                        <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: `/reviews/${game.id}` });
        }}
      >
        View Game Reviews
      </button>
       </div>                 
          </section>;
      })
      }
      </article>
     </article>
  );
};
