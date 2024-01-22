export interface UserDetails {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface CredentialsLogin {
  userName: string;
  password: string;
}

export interface AppointmentDetails {
  userId: string;
  appointmentDate: string;
  serviceType: string;
  dentistId: string;
  status: string;
  specialNotes?: string;
}

export interface UpdateAppointmentDetails {
  appointmentId: string;
  date: Date;
}

export interface ApiResponse {
  status: string;
  message: string;
  error: string;
  data: {
    accessToken: string;
    userId: string;
  };
}

export enum AppointmentStatus {
  OPEN = "OPEN",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface CancelAppointment {
  userId: string;
  appointmentId: string;
  status: string;
}

export interface UpdateApointment {
  appointmentId: string;
  appointmentDate: string;
  specialNotes: string;
  dentistId: string;
}

export enum AlertTypes {
  SUCCESS = "success",
  ERROR = "error",
}
