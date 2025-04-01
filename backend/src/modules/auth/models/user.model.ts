
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  role: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: UserDTO;
  token: string;
}
