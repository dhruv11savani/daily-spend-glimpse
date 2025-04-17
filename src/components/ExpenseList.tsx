
import React from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, getCategoryColor } from '@/utils/expense-utils';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (!expenses.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No expenses found.</p>
        <p className="text-sm text-muted-foreground mt-2">Add your first expense to start tracking!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {expenses.map((expense) => (
        <Card key={expense.id} className="expense-card overflow-hidden border-l-4" style={{ borderLeftColor: getCategoryColor(expense.category) }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    className="capitalize text-xs" 
                    style={{ backgroundColor: getCategoryColor(expense.category), color: 'white' }}
                  >
                    {expense.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{formatDate(expense.date)}</span>
                </div>
                <span className="expense-amount">{formatCurrency(expense.amount, expense.currency)}</span>
                {expense.notes && <p className="text-sm text-muted-foreground mt-1">{expense.notes}</p>}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => onDeleteExpense(expense.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExpenseList;
