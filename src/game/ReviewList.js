import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReviewContext } from "./ReviewProvider.js";
import { GamerContext } from "./GamerProvider";
import { GameContext } from "./GameProvider";

export const ReviewList = (props) => {
  const { getReviews, reviews } = useContext(ReviewContext);
  const { getGamer, gamer } = useContext(GamerContext);
  const history = useHistory();
  const { getGames, games, getGameById } = useContext(GameContext);

  const [gameReview, setGame] = useState({});
  const { gameId } = useParams();
  
  useEffect(() => {
   
     getReviews(gameId)
     getGamer();
    getGames();
  }, []);


  return (
    <article className="reviewHolder">
      <h1 className="raterReviewTitle">Reviews</h1>

      <div className="reviewButton"></div>
      <div className="flexReview">
        <article className="reviews">
          {reviews.map((review) => {
              console.log(review)

              return (
                <section key={review.id} className="review">
                  <div className="individualreviews">
                    <div className="review__gameName">
                      {/* ToDo: Map Through games to grab the game title using gameId */}
                    </div>
                    <div className="review__title">
                      <div className="reviewDescrip">
                        Description: {review.review_descrip}
                      </div>
                    </div>
                    <div className="review__description">
                      Rating of the Game: {review.rating}
                    </div>
                    {/* ToDo: Map through gamerId to grab the gamer name  */}
                    <div className="review__released">
                      Gamer: {gamer.gamer.user.first_name}
                    </div>
                  </div>
                </section>
              );
            }
          )}
        </article>
      </div>
    </article>
  );
};
