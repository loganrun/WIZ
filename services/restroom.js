import axios from "axios";

const restRoom = axios.create({
  baseURL: 'https://www.refugerestrooms.org/api/v1/restrooms',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default restRoom;
