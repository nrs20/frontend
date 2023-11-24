import axios from "axios"


class MovieDataService {  




  getAll(page = 0) {
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games`)
    .then(response => {
        console.log("Ratings response:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching ratings:", error);
        throw error;
      });
}

  get(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/id/${id}`)
    .then(response => {
        console.log("Get response:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching Get:", error);
        throw error;
      });  
}
  find(query, by = "external", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games?${by}=${query}&page=${page}`
    )
    .then(response => {
        console.log("Find response:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching find:", error);
        throw error;
      });
  }

  createReview(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/rating`, data)
    
    .then(response => {
      console.log("Create Review response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching Create Review:", error);
      throw error;
    });
  }

  updateReview(data) {
    console.log("THIS IS THE DATA PASSED INTO THE UPDATEREVIEW FUNCTION", data)
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/rating`, data)
    .then(response => {
      console.log("UPDATE Review response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching UPDATE Review:", error);
      throw error;
    });
  }
  
  deleteReview(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/rating`,
      { data: { _id: id, user_id: userId } }
     
    ) .then(response => {
        console.log("DELETE Review response:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching DELETE Review:", error);
        throw error;
      });
  }

  getRatings() {
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/ratings`)
    .then(response => {
        console.log("Ratings response:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching ratings:", error);
        throw error;
      });
  }
}
export default new MovieDataService()
