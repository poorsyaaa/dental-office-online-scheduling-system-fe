import axios, { AxiosRequestConfig } from "axios";
import { UserDetails, CredentialsLogin, AppointmentDetails, CancelAppointment, UpdateApointment } from "../../types";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type FetchApiOptions = {
  method?: HttpMethod;
  body?: object;
  queryParams?: Record<string, string | number | boolean>;
};

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

const makeRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient(config);

    return response.data as T;
  } catch (error) {
    console.error("API request error:", error);

    throw error;
  }
};

export const registerUser = async <T>(userDetails: UserDetails): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/auth/register`,
    method: HttpMethod.POST,
    data: userDetails,
  };

  return makeRequest<T>(config);
};

export const login = async <T>(credentials: CredentialsLogin): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/auth/login`,
    method: HttpMethod.POST,
    data: credentials,
  };

  return makeRequest<T>(config);
};

export const authenticateUser = async <T>(token: string): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/auth/${token}`,
    method: HttpMethod.GET,
  };

  return makeRequest<T>(config);
};

export const createAppointment = async <T>(appointmentDetails: AppointmentDetails): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/appointment`,
    method: HttpMethod.POST,
    data: appointmentDetails,
  };

  return makeRequest<T>(config);
};

export const getAppointment = async <T>(appointmentId: string): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/appointment/${appointmentId}`,
    method: HttpMethod.GET,
  };

  return makeRequest<T>(config);
};

export const updateAppointment = async <T>(appointmentDetails: UpdateApointment): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/appointment`,
    method: HttpMethod.PUT,
    data: appointmentDetails,
  };

  return makeRequest<T>(config);
};

export const cancelAppointment = async <T>(cancelDetails: CancelAppointment): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/appointment/cancel`,
    method: HttpMethod.PUT,
    data: cancelDetails,
  };

  return makeRequest<T>(config);
};

export const getAllAppointments = async <T>(userId: string): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/appointment/user/${userId}`,
    method: HttpMethod.GET,
  };

  return makeRequest<T>(config);
};

export const getUserDetails = async <T>(userId: string): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/user/${userId}`,
    method: HttpMethod.GET,
  };

  return makeRequest<T>(config);
};

export const getAllDentistDetails = async <T>(): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/dentist`,
    method: HttpMethod.GET,
  };

  return makeRequest<T>(config);
};

export const getListOfBookSlots = async <T>(dentistId: string): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}/slots/${dentistId}`,
    method: HttpMethod.GET,
  };

  return makeRequest<T>(config);
};
