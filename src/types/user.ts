
export interface User {
  id: string;
  username: string;
  password: string; // Note: In a real app, this should be hashed
  createdAt: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}
