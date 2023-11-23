import React, { useState, useEffect } from 'react'
import MovieDataService from "../services/moviesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const MoviesList = props => {
    const [gaming, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Prices"]) 
    useEffect(() => {
        console.log("Backend URL in moviesList.js:", process.env.REACT_APP_BACKEND_URL);

    console.log("Before retrieveMovies()");
      retrieveMovies()
      console.log("After retrieveMovies() and before retrieveRatings()");

      retrieveRatings()
      console.log("After retrieveMovies()", process.env.REACT_APP_BACKEND_URL);

    }, [])
  
  
    const retrieveMovies = () => {
      MovieDataService.getAll()
      
        .then(response => {
          console.log("This is the response in retrieveMovies()",response.data)
          //console.log(response.data)
          setMovies(response.data.games)
        })
        .catch(e => {
          console.log("INSIDE RETRIEVE MOVIES",e)
        })
    }
    console.log("This is gaming variable", gaming);
    const retrieveRatings = () => {
      MovieDataService.getRatings()
        .then(response => {
            console.log("Ratings response status:", response.status)
          console.log("This is the response",response.data)
          //start with 'All Ratings' if user doesn't specify any ratings
          const sortedRatings = response.data.sort((a, b) => a - b);

          setRatings(["All Prices"].concat(sortedRatings))
        })
        .catch(e => {
          console.log("INSIDE RETRIEVE RATINGS",e)
        })
    }
    console.log("This is ratings variable", ratings);

    const onChangeSearchTitle = e => {
      const searchTitle = e.target.value
      setSearchTitle(searchTitle);
    }
  
    const onChangeSearchRating = e => {
      const searchRating = e.target.value
      setSearchRating(searchRating);
    }

    const find = (query, by) => {
        MovieDataService.find(query, by)
          .then(response => {
            console.log("THIS IS IN FIND", response.data)
            setMovies(response.data.games)
          })
          .catch(e => {
            console.log(e)
          })
      }
      const findByTitle =
      () => {
        find(searchTitle, "external")
      }
  
    const findByRating =
      () => {
        if (searchRating === "All Prices") {
          retrieveMovies()
        } else {
          find(searchRating, "cheapest")
        }
      }
  
  //MAY HAVE TO CHANGE LINE 126 (/movies)
    return (
        <div className="App">
          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search by title"
                      value={searchTitle}
                      onChange={onChangeSearchTitle}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={findByTitle}
                  >
                    Search
                  </Button>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      as="select" onChange={onChangeSearchRating} >
                      {ratings.map(rating => {
                        return (
                          <option value={rating}>{rating}</option>
                        )
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={findByRating}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
            <Row>
          {gaming.map((movie) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={movie.thumb + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.external}</Card.Title>
                    <Card.Text>
                      Cheapest Price: {movie.cheapest}
                    </Card.Text>
                    <Card.Text>
  Link to Deal: <a href={`https://www.cheapshark.com/redirect?dealID=${movie.cheapestDealID}`} target="_blank" rel="noopener noreferrer">Deal</a>
</Card.Text>


                    <Link to={"/games/" + movie._id} >View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
          </Container>
        </div>
      );
}

export default MoviesList;
