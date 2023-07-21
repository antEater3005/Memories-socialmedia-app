import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile'))?.token
    }`;
  }
  // console.log(req.headers.authorization);
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);

export const commentPost = (comment, postId) =>
  API.post(`/posts/${postId}/comment`, { comment });
