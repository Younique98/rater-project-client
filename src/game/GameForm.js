import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";
import "./Game.css";

export const GameForm = () => {
  const history = useHistory();
  const { createGame, getGameCategories, gameCategories, games, getGames } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    title: "",
    description: "",
    yearReleased: 0,
    estimatedTimeToPlay: 0,
    numberOfPlayers: 0,
    ageRecommendation: 0,
    designer: localStorage.getItem("lu_token"),
    categoryId: 0,
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameCategories();
    getGames();
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.title]
    */
  const changeGameTitleState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.title = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameDescriptionState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.description = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameYearReleasedState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.yearReleased = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameEstimatedTimeToPlayState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.estimatedTimeToPlay = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameNumberOfPlayersState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.numberOfPlayers = event.target.value;
    setCurrentGame(newGameState);
  };
  const changeGameAgeRecommendationState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.ageRecommendation = event.target.value;
    setCurrentGame(newGameState);
  };
  const changeGameDesignerState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.designer = event.target.value;
    setCurrentGame(newGameState);
  };
  const changeGameCategoryState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.categoryId = event.target.value;
    setCurrentGame(newGameState);
  };
  /* REFACTOR CHALLENGE END */

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameTitleState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentGame.description}
            onChange={changeGameDescriptionState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="yearReleased">Year Released: </label>
          <input
            type="text"
            name="yearReleased"
            required
            autoFocus
            className="form-control"
            value={currentGame.yearReleased}
            onChange={changeGameYearReleasedState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="estimatedTimeToPlay">
            Length of Time to beat this game?
          </label>
          <input
            type="text"
            name="estimatedTimeToPlay"
            required
            autoFocus
            className="form-control"
            value={currentGame.estimatedTimeToPlay}
            onChange={changeGameEstimatedTimeToPlayState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">How many Players? </label>
          <input
            type="text"
            name="numberOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameNumberOfPlayersState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="ageRecommendation">
            What is the age Recommendation?{" "}
          </label>
          <input
            type="text"
            name="ageRecommendation"
            required
            autoFocus
            className="form-control"
            value={currentGame.ageRecommendation}
            onChange={changeGameAgeRecommendationState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="categoryId">What is the game category? </label>
          <select
            name="categoryId"
            className="form-control"
            value={currentGame.categoryId}
            onChange={changeGameCategoryState}
          >
            <option value="0">Select a Game Category</option>
            {gameCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            title: currentGame.title,
            description: currentGame.description,
            yearReleased: currentGame.yearReleased,
            estimatedTimeToPlay: currentGame.estimatedTimeToPlay,
            numberOfPlayers: currentGame.numberOfPlayers,
            ageRecommendation: currentGame.ageRecommendation,
            designer: localStorage.getItem("lu_token"),
            categoryId: currentGame.categoryId
          };
          // Send POST request to your API
          createGame(game).then(() => history.push("/"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
