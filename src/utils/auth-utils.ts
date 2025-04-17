
import { User, AuthState } from "@/types/user";
import { v4 as uuidv4 } from 'uuid';

const AUTH_STORAGE_KEY = 'daily-spend-glimpse-auth';
const USERS_STORAGE_KEY = 'daily-spend-glimpse-users';

// Load the current auth state
export const loadAuthState = (): AuthState => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  return stored ? JSON.parse(stored) : { currentUser: null, isAuthenticated: false };
};

// Save the current auth state
export const saveAuthState = (authState: AuthState): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
};

// Get all registered users
export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save all users
export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = (username: string, password: string): User | null => {
  const users = getUsers();
  
  // Check if username is already taken
  if (users.some(user => user.username === username)) {
    return null;
  }
  
  const newUser: User = {
    id: uuidv4(),
    username,
    password, // In a real app, this should be hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// Login a user
export const loginUser = (username: string, password: string): User | null => {
  const users = getUsers();
  
  // Find user by username and password
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    // Update auth state
    const authState: AuthState = {
      currentUser: user,
      isAuthenticated: true
    };
    saveAuthState(authState);
  }
  
  return user;
};

// Logout the current user
export const logoutUser = (): void => {
  const authState: AuthState = {
    currentUser: null,
    isAuthenticated: false
  };
  saveAuthState(authState);
};
