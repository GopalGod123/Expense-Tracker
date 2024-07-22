import React, { useReducer } from 'react';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo/ExpenseInfo';
import ExpenseList from './components/ExpenseList/ExpenseList';
import './App.css';

const initialState = {
    expenses: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'DELETE_EXPENSE':
            const updatedExpenses = state.expenses.filter(
                (expense) => expense.id !== action.payload
            );
            console.log('Expenses after delete:', updatedExpenses); // Debugging line
            return {
                ...state,
                expenses: updatedExpenses,
            };
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addExpense = (expense) => {
        console.log('Adding expense:', expense); // Debugging line
        dispatch({ type: 'ADD_EXPENSE', payload: expense });
    };

    const deleteExpense = (id) => {
        console.log('Deleting expense with ID:', id); // Debugging line
        dispatch({ type: 'DELETE_EXPENSE', payload: id });
    };

    return (
        <>
            <h2 className="mainHeading">Expense Tracker</h2>
            <div className="App">
                <ExpenseForm addExpense={addExpense} />
                <div className="expenseContainer">
                    <ExpenseInfo expenses={state.expenses} />
                    <ExpenseList
                        expenses={state.expenses}
                        deleteExpense={deleteExpense}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
