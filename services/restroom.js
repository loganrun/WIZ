import axios from "axios";

const restRoom = axios.create({
  baseURL: 'http://Whizzbreak2121-env.eba-4xmmjah6.us-east-2.elasticbeanstalk.com',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default restRoom;

//'http://prototypeapp-env.pafwfr7hjt.us-west-2.elasticbeanstalk.com'

