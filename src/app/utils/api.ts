"use client";
import axios from "axios";
import { getCookie } from 'cookies-next/client';

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use((config) => {
  const token = getCookie('JWT_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
