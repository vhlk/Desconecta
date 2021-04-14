import axios from 'axios';

const address = 'https://localhost:3000';

const Api = axios.create({
    baseURL: address
});

export default Api;