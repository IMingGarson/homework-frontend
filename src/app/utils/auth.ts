"use client";
import api from "@/app/utils/api";
import { setCookie } from 'cookies-next/client';

export async function loginAction(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    setCookie('JWT_TOKEN', data.accessToken);
    setCookie('ROLE', data.role);
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { error: "Invalid email or password" };
  }
}