/*Name: Natalia Smith
Date: 11/30/2023
Course: IT302
Section: 001
Assignment: Unit 11
Email: nrs5@njit.edu
*/
import React, {useState, useEffect} from 'react'
import GameDataService from '../services/gamesDataService'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';

const Game = props => {

  const [Game, setGame] = useState({
    id: null,
    title: "",
    rated:"",
    ratings:[]
  })
  const getGame = id => {
    GameDataService.get(id)
      .then(response => {
        setGame(response.data)
      //  console.log("WE ARE INSIDE GET Game",response.data)
       // console.log("THIS IS THE Game VARIABLE",Game)
      //  console.log("THIS IS THE SETGame VARIABLE",Game)

      })
      .catch(e => {
        console.log(e)
      })
  }

  const deleteRating = (ratingID, index) => {
    console.log("THIS IS THE RATING ID INSIDE DELETE RATING", ratingID)
    console.log("THIS IS THE USER:", props.user.id)
    GameDataService.deleteRating(ratingID, props.user.id)
      .then(response => {
        setGame((prevState) => {
          prevState.ratings.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
  
  useEffect( () => {
    getGame(props.match.params.id)
      },[props.match.params.id])
      useEffect(() => {
        // Log the updated Game state here
        console.log('Updated Game State:', Game);
      }, [Game]);
  return (
    <div>
    <Container>
<Row>
<Col>
<Image src={Game.thumb + "/500px450"} style={{ width: '300px', height: '250px' }} />
</Col>
<Col>
<Card>
<Card.Header as="h5">{Game.external}</Card.Header>
<Card.Body>
<Card.Text>
Cheapest Price: ${Game.cheapest}
</Card.Text>
{props.user &&
<Link to={"/nrs5_games/" + props.match.params.id + "/rating"}>
Add Rating
</Link>}
</Card.Body>
</Card>
<br></br>
<h2>Ratings</h2>
<br></br>

{Game.ratings.length === 0 ? (
  <p>No ratings available</p>
) : (
  Game.ratings.map((RATING, index) => (
    <Media key={index}>
      <Media.Body>
        <h5>{RATING.name + " left a rating on " + new Date(Date.parse(RATING.lastModified)).toDateString()}</h5>
        <p>{RATING.rating}</p>
        {props.user && props.user.id === RATING.user_id && (
          <Row>
            <Col>
              <Link
                to={{
                  pathname: "/nrs5_games/" + props.match.params.id + "/rating",
                  state: { currentRating: RATING },
                }}
              >
                Edit
              </Link>
            </Col>
            <Col>
              <Button variant="link" onClick={() => deleteRating(RATING._id, index)}>
                Delete
              </Button>
            </Col>
          </Row>
        )}
      </Media.Body>
    </Media>
  ))
)}




</Col>
</Row>
</Container>
</div>
);


  }
  
  export default Game;
  