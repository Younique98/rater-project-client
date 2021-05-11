import React from "react"
import "./Review.css"
import { Link } from "react-router-dom"

export default ({ review }) => (
    <section className="review">
        <h3 className="review">
            <Link to={`/gamereview/${review.id}`}>
                { review.title }
            </Link>
        </h3>
        <div className="review__title">{ review.title }</div>
    </section>
)