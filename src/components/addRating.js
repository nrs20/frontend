/*Name: Natalia Smith
Date: 11/30/2023
Course: IT302
Section: 001
Assignment: Unit 11
Email: nrs5@njit.edu
*/
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
  // keeps track if rating is submitted
  const [submitted, setSubmitted] = useState(false)

  const onChangeRating = e => {
    const game_rating = e.target.value
    console.log("THIS IS THE rating VAR IN onChangeRating", game_rating)
    setRating(game_rating);
  }

const saveRating = () => {
  var data = {
       game_id: props.match.params.id,
       rating: rating,
        user_id: props.user.id,
name: props.user.name
    // get game id direct from url
 
  }
    console.log("This is the editing variable", editing)
    if (editing) {
      console.log("THIS IS THE DATA WE ARE WORKING WITH", data)
      // get existing rating 
      console.log("THIS IS THE CURRENT RATING", props.location.state.currentRating)
      data.rating_id = props.location.state.currentRating._id
      console.log("THIS IS THE DATA rating ID", data.rating_id)
      console.log("THIS IS THE rating ID", data.rating_id)
       console.log("THIS IS THE DATA BEING PASSED INTO UPDATE rating",data)
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

  
  


  return (
    <div>
      {submitted ? (
        <div>
          <h4>Rating submitted successfully</h4>
          <Link to={"/nrs5_games/" + props.match.params.id}>
            Back to Game
          </Link>
        </div>
      ) : (
          <Form>
            <Form.Group>
              <Form.Label>{editing ? "Edit" : "Create"} Rating</Form.Label>
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