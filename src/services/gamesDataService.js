import axios from "axios"


class GameDataService {  




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

  createRating(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/rating`, data)
    
    .then(response => {
      console.log("Create Rating response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching Create Rating:", error);
      throw error;
    });
  }

  updateRating(data) {
    console.log("THIS IS THE DATA PASSED INTO THE updateRating FUNCTION", data)
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/rating`, data)
    .then(response => {
      console.log("UPDATE Rating response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching UPDATE Rating:", error);
      throw error;
    });
  }
  
  deleteRating(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/nrs5/games/rating`,
      { data: { _id: id, user_id: userId } }
     
    ) .then(response => {
        console.log("DELETE Rating response:", response.data);
        return response;
      })
      .catch(error => {
        console.error("Error fetching DELETE Rating:", error);
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
export default new GameDataService()
