import axios from "axios";

const restRoom = axios.create({
  baseURL: 'http://prototypeapp-env.pafwfr7hjt.us-west-2.elasticbeanstalk.com',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default restRoom;

//https://www.refugerestrooms.org/api/v1/restrooms',
//'http://localhost:5000'