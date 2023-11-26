import React, { useState } from 'react'
import GameDataService from "../services/gamesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddRating = props => {
  let editing = false
  let initialRatingState = ""
  console.log("This is the editing variable", editing)

  if (props.location.state && props.location.state.currentRating) {
    editing = true
    initialRatingState = props.location.state.currentRating.rating
  }

  const [rating, setRating] = useState(initialRatingState)
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false)

  const onChangeRating = e => {
    const review = e.target.value
    console.log("THIS IS THE REVIEW VAR IN onChangeRating", review)
    setRating(review);
  }

const saveRating = () => {
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
      console.log("THIS IS THE CURRENT RATING", props.location.state.currentRating)
      data.review_id = props.location.state.currentRating._id
      console.log("THIS IS THE DATA REVIEW ID", data.review_id)
      console.log("THIS IS THE REVIEW ID", data.review_id)
       console.log("THIS IS THE DATA BEING PASSED INTO UPDATE REVIEW",data)
       GameDataService.updateRating(data)
     
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      GameDataService.createRating(data)
        .then(response => {
          setSubmitted(true)
        }).catch(e => { })
    }
  }

  
  


  /*
  console.log("THIS IS THE DATA PASSED IN", data);
  console.log("THIS IS THE GAME ID PASSED IN", data.gameID)
  GameDataService.createReview(data)
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
          <Link to={"/nrs5_games/" + props.match.params.id}>
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
                onChange={onChangeRating}
              />
            </Form.Group>
            <Button variant="primary" onClick={saveRating}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    )
  }

export default AddRating;