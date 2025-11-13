export interface User {
  id: string;
  email: string;
  photo?: string;
  isPaid: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserUpdateData {
  email?: string;
  password?: string;
  status?: string;
  isPaid?: boolean;
  photo?: any; // arquivo multipart
}
