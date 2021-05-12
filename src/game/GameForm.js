import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";
import "./Game.css";

export const GameForm = (props) => {
  const history = useHistory();
  const { createGame, getGameCategories, gameCategories, getGames, games, updateGame } = useContext(GameContext);
  const [ eventState, setEvent ] = useState({})
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
  const editMode = props.match.params.hasOwnProperty("gameId")

  const getGameInEditMode = () => {
    if (editMode) {
        const gameId = parseInt(props.match.params.gameId)
        const selectedGame = games.find(g => g.id === gameId) || {}
        setEvent(selectedGame)
    }
}
  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameCategories();
    getGames();
    console.log(props)
  }, []);

  useEffect(() => {
    getGameInEditMode()
}, [games])
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
    newGameState.year_released = event.target.value;
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

  const changeGameCategoryState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.categories = event.target.value;
    setCurrentGame(newGameState);
  };

  const constructUpdateGame = () => {
    const gameId = parseInt(eventState.id)

    if (gameId === 0) {
        window.alert("Please select an game")
    } else {
        if (editMode) 
        {console.log(eventState)
            // PUT
            console.log(currentGame)
            debugger
            updateGame({
              
                id: eventState.id,
                title: currentGame.title,
                description: eventState.description,
                yearReleased: eventState.year_released,
                estimatedTimeToPlay: eventState.estimated_time_to_play,
                numberOfPlayers: eventState.number_of_players,
                ageRecommendation: eventState.age_recommendation,
                categoryId: currentGame.categories,
                designer: localStorage.getItem("lu_token")
            })
                .then(() => props.history.push("/"))
        } 
    }
}





  /* REFACTOR CHALLENGE END */

  return (
    
    <form className="gameForm">
      <h2 className="gameForm__title">{editMode ? "Update Game" : "Register New Game"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={eventState.title}
            required
            autoFocus
            className="form-control"

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
            placeholder="Description"
            defaultValue={eventState.description}
            required
            autoFocus
            className="form-control"

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
            placeholder="Year Released"
            defaultValue={eventState.year_released}
            required
            autoFocus
            className="form-control"

            onChange={changeGameYearReleasedState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="estimatedTimeToPlay">
            How many hours to beat this game?
          </label>
          <input
            type="text"
            name="estimatedTimeToPlay"
            placeholder="Game Estimated Play Time?"
            defaultValue={eventState.estimated_time_to_play}
            required
            autoFocus
            className="form-control"

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
            placeholder="How many Players needed?"
            defaultValue={eventState.number_of_players}
            required
            autoFocus
            className="form-control"

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
            placeholder="Age Recommended"
            defaultValue={eventState.age_recommendation}
            required
            autoFocus
            className="form-control"

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
            defaultValue={eventState.categories}
            onChange={changeGameCategoryState}
            placeholder="Game Category"
          >
            <option value="0">Select a Game Category</option>
            {console.log(gameCategories)}
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
        Create Game
      </button>
      <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructUpdateGame()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Edit Event"}
            </button>
    </form>
  );
};
