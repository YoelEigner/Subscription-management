import axios from "axios";
export const GetUsers = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
};
export const GetMovies = async () => {
  return await axios.get("https://api.tvmaze.com/shows");
};
