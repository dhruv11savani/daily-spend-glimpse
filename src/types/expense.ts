
export type ExpenseCategory = 
  | 'food' 
  | 'transportation' 
  | 'entertainment' 
  | 'bills' 
  | 'shopping'
  | 'health'
  | 'travel'
  | 'other';

export type CurrencyType = 'USD' | 'INR';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes?: string;
  currency: CurrencyType;
  userId: string; // Added userId field to associate expenses with users
}

export interface ExpenseFilters {
  category?: ExpenseCategory | 'all';
  dateFrom?: string;
  dateTo?: string;
}
