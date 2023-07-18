import axios from 'axios';

export const api = axios.create({
  baseURL: "https://rocketnotes-api-dwl5.onrender.com"
  // baseURL: "http://localhost:8080"
});

api.get("/users/:id");