import axios from 'axios';

const apiKey = "7NmxfSO3r5cO1iVjlSvkR5CBv17T_BDZ99MfpK0ZVsu7eQJ_Is8kd0wnXtmrBmrBJYZ5jRJoz8X-FtaQ9zN4MDr3dSIHkSblFQRxmQYrV2cf-IMd3fX5hkCQKRlqXHYx";

const api = axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    timeout: 40000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + apiKey
    }
});

export default api;