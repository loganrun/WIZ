import axios from "axios";

const refugee = axios.create({
  baseURL: 'http://refugerestrooms.org/api',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default refugee;