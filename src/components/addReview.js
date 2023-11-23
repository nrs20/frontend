import React, { useState } from 'react'
import MovieDataService from "../services/moviesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = props => {
  let editing = false
  let initialReviewState = ""
  console.log("This is the editing variable", editing)

  if (props.location.state && props.location.state.currentRating) {
    editing = true
    initialReviewState = props.location.state.currentRating.rating
  }

  const [rating, setReview] = useState(initialReviewState)
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false)

  const onChangeReview = e => {
    const review = e.target.value
    console.log("THIS IS THE REVIEW VAR IN onChangeReview", review)
    setReview(review);
  }

const saveReview = () => {
  var data = {
       game_id: props.match.params.id,
       rating: rating,
        user_id: props.user.id,
name: props.user.name
    // get movie id direct from url
 
  }
    console.log("This is the editing variable", editing)
    if (editing) {
      console.log("THIS IS THE DATA WE ARE WORKING WITH", data)
      // get existing review id
      data.review_id = props.location.state.currentRating._id
      console.log("THIS IS THE DATA REVIEW ID", data.review_id)
      console.log("THIS IS THE REVIEW ID", data.review_id)
       console.log("THIS IS THE UPDATED REVIEW DATA",data)
       MovieDataService.updateReview(data)
     
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      MovieDataService.createReview(data)
        .then(response => {
          setSubmitted(true)
        }).catch(e => { })
    }
  }

  
  


  /*
  console.log("THIS IS THE DATA PASSED IN", data);
  console.log("THIS IS THE GAME ID PASSED IN", data.gameID)
  MovieDataService.createReview(data)
    .then(response => {
      console.log("THIS IS THE RESPONSE FROM CREATE REVIEW", response.data)
      setSubmitted(true)
    }).catch(e => { })
}
*/
  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={"/games/" + props.match.params.id}>
            Back to Movie
          </Link>
        </div>
      ) : (
          <Form>
            <Form.Group>
              <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
              <Form.Control
                type="text"
                required
                value={rating}
                onChange={onChangeReview}
              />
            </Form.Group>
            <Button variant="primary" onClick={saveReview}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    )
  }

export default AddReview;