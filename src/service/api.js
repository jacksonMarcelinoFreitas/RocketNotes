import axios from 'axios';

export const api = axios.create({
  baseURL: "https://rocketnotes-api-dwl5.onrender.com"
});

api.get("/users/:id");