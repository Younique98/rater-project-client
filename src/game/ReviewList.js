import React, { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";

import { ReviewContext } from "./ReviewProvider.js";


export const ReviewList = (props) => {
  const { getReviews, reviews } = useContext(ReviewContext);
  const { gameId } = useParams();
  
  useEffect(() => {
     getReviews(parseInt(gameId));
  }, []);


  return (
    <article className="reviewHolder">
      <h1 className="raterReviewTitle">Reviews</h1>

      <div className="reviewButton"></div>
      <div className="flexReview">
        <article className="reviews">
          {reviews.map((review) => {

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
                      Gamer: {review.gamer_id.user.first_name}
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
