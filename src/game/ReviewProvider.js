import React, { useState } from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [ reviews, setReview ] = useState([])



    const getReviews = (gameId) => {
        return fetch(`http://localhost:8000/gamereview?game=${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setReview)
    }
    
    const createReview = (review) => {
        return fetch("http://localhost:8000/gamereview", { 
        method: "POST",    
        headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(response => response.json())
    }
    return (
        <ReviewContext.Provider value={{ createReview, getReviews, reviews }} >
            { props.children }
        </ReviewContext.Provider>
    )
}