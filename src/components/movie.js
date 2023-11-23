import React, {useState, useEffect} from 'react'
import MovieDataService from '../services/moviesDataService'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';

const Movie = props => {

  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated:"",
    ratings:[]
  })
  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data)
      //  console.log("WE ARE INSIDE GET MOVIE",response.data)
       // console.log("THIS IS THE MOVIE VARIABLE",movie)
      //  console.log("THIS IS THE SETMOVIE VARIABLE",movie)

      })
      .catch(e => {
        console.log(e)
      })
  }
  useEffect( () => {
    getMovie(props.match.params.id)
      },[props.match.params.id])
      useEffect(() => {
        // Log the updated movie state here
        console.log('Updated Movie State:', movie);
      }, [movie]);
  return (
    <div>
    <Container>
<Row>
<Col>
<Image src={movie.thumb+"/100px250"} fluid />
</Col>
<Col>
<Card>
<Card.Header as="h5">{movie.external}</Card.Header>
<Card.Body>
<Card.Text>
Cheapest Price: {movie.cheapest}
</Card.Text>
{props.user &&
<Link to={"/games/" + props.match.params.id + "/rating"}>
Add Review
</Link>}
</Card.Body>
</Card>
<br></br>
<h2>Reviews</h2>
<br></br>

{movie.ratings.map((review, index)=>{
return (
<Media key={index}>
<Media.Body>
<h5>{review.name + " reviewed on " + new Date(Date.parse(review.lastModified)).toDateString()}</h5>
<p>{review.rating}</p>
{props.user && props.user.id === review.user_id &&
<Row>

<Col><Link to={{
pathname:"/movies/"+
props.match.params.id+
"/review",
state: {currentReview: review}
}}>Edit</Link>
</Col>
<Col><Button variant="link">Delete</Button></Col>
</Row>
}
</Media.Body>
</Media>
)
})}





</Col>
</Row>
</Container>
</div>
);


  }
  
  export default Movie;
  