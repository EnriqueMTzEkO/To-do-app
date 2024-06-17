import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true // Esto es crucial para enviar las cookies
});

export default instance;
