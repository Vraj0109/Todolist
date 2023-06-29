"use client"
import {createContext, useContext, useState,ReactNode} from "react";
// import {Errors} from "next/dist/client/components/react-dev-overlay/internal/container/Errors";

export type Todo = {
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}
export type TodosContext = {
    todos:Todo[];
    handleAddTodo : (task:string) => void;
    toggleTodoAsCompleted: (id:string) => void;
    handleTodoDelete:(id:string) =>void;
}
export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({children}: {children:ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>(() =>{
        const newTodos = localStorage.getItem("todos") || "[]";
        return JSON.parse(newTodos) as Todo[]
    });
    const handleAddTodo = (task:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = [
                {
                id:Math.random().toString(),
                task,
                completed:false,
                createdAt:new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos",JSON.stringify(newTodos));
                return newTodos;
            }
        )
    }
    //if the task is completed
    const toggleTodoAsCompleted = (id:string) => {
        setTodos((prev) =>{
            const newTodos = prev.map((task) =>{
                if(task.id === id){
                    return {...task,completed: !task.completed}
                }
                return task;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
        })
    }

    //if task is not completed
    const handleTodoDelete = (id:string) =>{
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id);
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
        })
    }
    return (
        <todosContext.Provider value={{todos,handleAddTodo,toggleTodoAsCompleted,handleTodoDelete}}>
            {children}
        </todosContext.Provider>
    )
}

// context api

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if(!todosContextValue){
        throw new Error("use context is outside");
    }
    return todosContextValue;
}