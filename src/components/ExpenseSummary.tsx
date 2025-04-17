
import React from 'react';
import { Expense } from '@/types/expense';
import { calculateTotal, formatCurrency, expensesByCategory, loadCurrencyPreference } from '@/utils/expense-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ExpenseSummaryProps {
  expenses: Expense[];
  isMonthly?: boolean;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses, isMonthly = false }) => {
  const total = calculateTotal(expenses);
  const categoryData = expensesByCategory(expenses);
  const preferredCurrency = loadCurrencyPreference();
  
  // Format data for chart
  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount
  }));
  
  // Colors for chart segments
  const COLORS = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', '#00BCD4', '#795548', '#607D8B'];
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{isMonthly ? 'Monthly Summary' : 'Total Expenses'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-center mb-4">{formatCurrency(total, preferredCurrency)}</div>
        
        {expenses.length > 0 && (
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => formatCurrency(value as number, preferredCurrency)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {expenses.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">
            No data available to display
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
