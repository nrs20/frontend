/*Name: Natalia Smith
Date: 11/30/2023
Course: IT302
Section: 001
Assignment: Unit 11
Email: nrs5@njit.edu
*/

import React, { useState, useEffect } from 'react'
import GameDataService from "../services/gamesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const GamesList = props => {
    const [gaming, setGames] = useState([])
    
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Prices"]) 
    useEffect(() => {
        console.log("Backend URL in GamesList.js:", process.env.REACT_APP_BACKEND_URL);

    console.log("Before retrieveGames()");
      retrieveGames()
      console.log("After retrieveGames() and before retrieveRatings()");

      retrieveRatings()
      console.log("After retrieveGames()", process.env.REACT_APP_BACKEND_URL);

    }, [])
  
    const clearSearch = () => {
      setSearchTitle("");
      setSearchRating("All Prices");
      retrieveGames();
    };
    const retrieveGames = () => {
      GameDataService.getAll()
      
        .then(response => {
          console.log("This is the response in retrieveGames()",response.data)
          //console.log(response.data)
          setGames(response.data.games)
        })
        .catch(e => {
          console.log("INSIDE RETRIEVE gameS",e)
        })
    }
    console.log("This is gaming variable", gaming);
    const retrieveRatings = () => {
      GameDataService.getRatings()
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
      GameDataService.find(query, by)
          .then(response => {
              console.log("API Response:", response.data);
              setGames(response.data.games);
          })
          .catch(error => {
              console.log("Error fetching data:", error);
          });
  };
      const findByTitle =
      () => {
        find(searchTitle, "external")
      }
  
    const findByRating =
      () => {
        if (searchRating === "All Prices") {
          retrieveGames()
        } else {
          find(searchRating, "cheapest")
        }
      }
  
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
                  <Button variant="primary" type="button" onClick={clearSearch}>
    View All Games
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
          {gaming.map((game) => {
            return (
              <Col>
                <Card style={{ width: '30rem' }}>
                  <Card.Img src={game.thumb + "/300px580"} />
                  <Card.Body>
                    <Card.Title>{game.external}</Card.Title>
                    <Card.Text>
                      Cheapest Price: ${game.cheapest}
                    </Card.Text>
                    <Card.Text>
  Link to Deal: <a href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`} target="_blank" rel="noopener noreferrer">Deal</a>
</Card.Text>


                    <Link to={"/nrs5_games/" + game._id} >View Ratings</Link>
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

export default GamesList;
