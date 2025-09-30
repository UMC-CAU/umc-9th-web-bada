import type { TTodo } from '../types/todo';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';

interface ITodoContext{
    todos: TTodo[];
    donetodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({children}:
     PropsWithChildren)=> {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [donetodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo = (text: string): void => {
        const newTodo: TTodo = {id: Date.now(), text};
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
    };

    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos): TTodo[] => prevTodos.filter((t) : boolean => t.id 
        !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
       };
    
       const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodos): TTodo[] => 
            prevDoneTodos.filter((t) : boolean => t.id !== todo.id));
       };

    return (
        <TodoContext.Provider 
        value={{todos, donetodos, addTodo, completeTodo, deleteTodo}}>

            {children}
        </TodoContext.Provider>
    );
     };

export const useTodo = () : ITodoContext => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};