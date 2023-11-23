import React, { useState } from 'react'
import MovieDataService from "../services/moviesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = props => {
  let editing = false
  let initialReviewState = ""

  const [rating, setReview] = useState(initialReviewState)
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false)

  const onChangeReview = e => {
    const review = e.target.value
    setReview(review);
  }

const saveReview = () => {
  var data = {
    rating: rating,
    name: props.user.name,
    user_id: props.user.id,
    // get movie id direct from url
    gameID: props.match.params.id
  }
  MovieDataService.createReview(data)
    .then(response => {
      console.log("THIS IS THE RESPONSE FROM CREATE REVIEW", response.data)
      setSubmitted(true)
    }).catch(e => { })
}

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={"/movies/" + props.match.params.id}>
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