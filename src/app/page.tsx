import React from 'react';
import AddTodo from "@/components/add-todo";
import Todos from "@/components/todos";
import Navbar from "@/components/navbar";
import "./globals.css"
import { RiTodoFill } from "react-icons/ri";
const Page = () => {
    return (
        <main>
            <h2> <RiTodoFill className="icons"/> ToDo List <RiTodoFill className="icons"/></h2>
            <Navbar/>
            <AddTodo/>
            <Todos/>
        </main>
    );
};

export default Page;