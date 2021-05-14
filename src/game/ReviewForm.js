import React, { useContext, useState, useEffect } from "react";
import { ReviewContext } from "./ReviewProvider.js";
import { useHistory } from "react-router-dom";
import "./Review.css"
import { GameContext } from "./GameProvider"

export const ReviewForm = (props) => {
  const history = useHistory();
  const { createReview, getReviews } = useContext(ReviewContext);
  const { getGames, games } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentReview, setCurrentReview] = useState({
    reviewDescrip: "",
    rating: 1,
    gamerId: localStorage.getItem("lu_token"),
    gameId: 0,
  });

  /*
        Get Review types on initialization so that the <select>
        element presents Review type choices to the user.
    */
  useEffect(() => {
    // getReviews();
    getGames();
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.reviewDescrip]
    */
  const changeReviewDescripState = (event) => {
    const newReviewState = { ...currentReview };
    newReviewState.reviewDescrip = event.target.value;
    setCurrentReview(newReviewState);
  };

  const changeReviewRatingState = (event) => {
    const newReviewState = { ...currentReview };
    newReviewState.rating = event.target.value;
    setCurrentReview(newReviewState);
  };

  const changeReviewGameState = (event) => {
    const newReviewState = { ...currentReview };
    newReviewState.gameId = event.target.value;
    setCurrentReview(newReviewState);
  };
  /* REFACTOR CHALLENGE END */

  return (
    <form className="ReviewForm">
      <h2 className="ReviewForm__reviewDescrip">Register New Review</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="reviewDescrip">Review Description: </label>
          <input
            type="text"
            name="reviewDescrip"
            required
            autoFocus
            className="form-control"
            value={currentReview.reviewDescrip}
            onChange={changeReviewDescripState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">What game are you reviewing? </label>
          <select
            name="gameId"
            className="form-control"
            value={currentReview.gameId}
            onChange={changeReviewGameState}
          >
            <option value="0">Select a Game to Review</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="rating">How would you rate this game? </label>
            <option value="0">Select a Rating</option>
          <select
            name="rating"
            className="form-control"
            value={currentReview.rating}
            onChange={changeReviewRatingState} name="rating" id="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each Review property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const review = {
            reviewDescrip: currentReview.reviewDescrip,
            rating: parseInt(currentReview.rating),
            gamerId: localStorage.getItem("lu_token"),
            gameId: parseInt(currentReview.gameId)
          };
          // Send POST request to your API
          createReview(review).then(() => history.push("/"));
        }}
        className="btn btn-primary"
      >
        Create Review
      </button>
    </form>
  );
};
