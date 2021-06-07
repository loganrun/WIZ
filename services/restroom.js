import axios from "axios";

const restRoom = axios.create({
  baseURL: 'http://prototypeapp-env.pafwfr7hjt.us-west-2.elasticbeanstalk.com',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

const refugeeApi = axios.create({
  baseURL: 'https://www.refugerestrooms.org/api/v1/restrooms',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export { refugeeApi };
export default restRoom;

