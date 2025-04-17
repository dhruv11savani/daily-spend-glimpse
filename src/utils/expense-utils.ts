
import { Expense, ExpenseCategory, ExpenseFilters, CurrencyType } from "@/types/expense";
import { format, parse, isWithinInterval } from "date-fns";
import { loadAuthState } from "./auth-utils";

// Get category icon color for visualization
export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors = {
    food: '#4CAF50',
    transportation: '#2196F3',
    entertainment: '#9C27B0',
    bills: '#F44336',
    shopping: '#FF9800',
    health: '#00BCD4',
    travel: '#795548',
    other: '#607D8B'
  };
  
  return colors[category] || colors.other;
};

// Format currency based on type
export const formatCurrency = (amount: number, currency: CurrencyType = 'USD'): string => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
};

// Filter expenses based on criteria
export const filterExpenses = (expenses: Expense[], filters: ExpenseFilters): Expense[] => {
  return expenses.filter(expense => {
    // Category filter
    if (filters.category && filters.category !== 'all' && expense.category !== filters.category) {
      return false;
    }
    
    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      const expenseDate = new Date(expense.date);
      
      if (filters.dateFrom && filters.dateTo) {
        const startDate = new Date(filters.dateFrom);
        const endDate = new Date(filters.dateTo);
        return isWithinInterval(expenseDate, { start: startDate, end: endDate });
      } else if (filters.dateFrom) {
        const startDate = new Date(filters.dateFrom);
        return expenseDate >= startDate;
      } else if (filters.dateTo) {
        const endDate = new Date(filters.dateTo);
        return expenseDate <= endDate;
      }
    }
    
    return true;
  });
};

// Calculate total from expenses array
export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Group expenses by category for charting
export const expensesByCategory = (expenses: Expense[]): Record<ExpenseCategory, number> => {
  const categorySums: Partial<Record<ExpenseCategory, number>> = {};
  
  expenses.forEach(expense => {
    const { category, amount } = expense;
    categorySums[category] = (categorySums[category] || 0) + amount;
  });
  
  return categorySums as Record<ExpenseCategory, number>;
};

// Get current month's expenses
export const getCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
  });
};

// LocalStorage operations
const STORAGE_KEY = 'daily-spend-glimpse';
const CURRENCY_KEY = 'daily-spend-glimpse-currency';

export const saveExpenses = (expenses: Expense[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const expenses = stored ? JSON.parse(stored) : [];
  
  // Get current auth state
  const { currentUser, isAuthenticated } = loadAuthState();
  
  // Filter expenses by current user if authenticated
  if (isAuthenticated && currentUser) {
    return expenses
      .filter((expense: Expense) => expense.userId === currentUser.id)
      .map((expense: any) => ({
        ...expense,
        currency: expense.currency || 'USD' // Default to USD for backward compatibility
      }));
  }
  
  // Return empty array if not authenticated
  return isAuthenticated ? [] : expenses.map((expense: any) => ({
    ...expense,
    currency: expense.currency || 'USD' // Default to USD for backward compatibility
  }));
};

export const saveCurrencyPreference = (currency: CurrencyType): void => {
  localStorage.setItem(CURRENCY_KEY, currency);
};

export const loadCurrencyPreference = (): CurrencyType => {
  return (localStorage.getItem(CURRENCY_KEY) as CurrencyType) || 'USD';
};
