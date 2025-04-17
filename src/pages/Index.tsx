
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseFilters from '@/components/ExpenseFilters';
import ExpenseSummary from '@/components/ExpenseSummary';
import UserProfile from '@/components/UserProfile';
import { Expense, ExpenseFilters as ExpenseFiltersType } from '@/types/expense';
import { loadExpenses, saveExpenses, filterExpenses, getCurrentMonthExpenses } from '@/utils/expense-utils';
import { loadAuthState } from '@/utils/auth-utils';
import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFiltersType>({
    category: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [authState, setAuthState] = useState(loadAuthState());
  const navigate = useNavigate();

  // Redirect to auth page if not authenticated
  useEffect(() => {
    const currentAuth = loadAuthState();
    setAuthState(currentAuth);
    
    if (!currentAuth.isAuthenticated) {
      navigate('/auth');
    }
  }, [navigate]);

  // Load expenses from localStorage on initial load
  useEffect(() => {
    if (authState.isAuthenticated) {
      const storedExpenses = loadExpenses();
      setExpenses(storedExpenses);
    }
  }, [authState.isAuthenticated]);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (authState.isAuthenticated) {
      saveExpenses(expenses);
    }
  }, [expenses, authState.isAuthenticated]);

  const handleAddExpense = (expense: Omit<Expense, 'id' | 'userId'>) => {
    if (!authState.currentUser) return;
    
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      userId: authState.currentUser.id
    };
    
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  const handleFilterChange = (newFilters: ExpenseFiltersType) => {
    setFilters(newFilters);
  };

  const handleLogout = () => {
    setExpenses([]);
    setAuthState(loadAuthState());
    navigate('/auth');
  };

  const filteredExpenses = filterExpenses(expenses, filters);
  const monthlyExpenses = getCurrentMonthExpenses(expenses);

  // If not authenticated, don't render the main content
  if (!authState.isAuthenticated || !authState.currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Daily Spend Glimpse
        </h1>
        <p className="text-muted-foreground text-center mb-4">
          Track your expenses and take control of your finances
        </p>
      </div>

      <div className="mb-6">
        <UserProfile user={authState.currentUser} onLogout={handleLogout} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm onAddExpense={handleAddExpense} />
          
          <div className="mt-6">
            <ExpenseSummary expenses={monthlyExpenses} isMonthly={true} />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Expenses</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
              </TabsList>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Filters 
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {showFilters && (
              <div className="mb-4 animate-fade-in">
                <ExpenseFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                />
              </div>
            )}
            
            <TabsContent value="all" className="mt-0">
              <ExpenseList 
                expenses={filteredExpenses} 
                onDeleteExpense={handleDeleteExpense} 
              />
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-0">
              <ExpenseList 
                expenses={filterExpenses(monthlyExpenses, filters)} 
                onDeleteExpense={handleDeleteExpense} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <footer className="text-center text-sm text-muted-foreground py-4">
        <p>Daily Spend Glimpse &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default ExpenseTracker;
