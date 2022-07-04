import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

const returnData = (res) => res.data;
export const getPosts = (page = 1, limit = 6) => {
  return axiosRequest
    .get(`posts?_page=${page}&_limit=${limit}`)
    .then(returnData);
};
export const getPhotos = (page = 1, limit = 6) => {
  return axiosRequest
    .get(`photos?_page=${page}&_limit=${limit}`)
    .then(returnData);
};
