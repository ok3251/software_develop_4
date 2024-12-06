import React, { useState, useEffect } from "react";
import axios from "axios";
import MainPresenter from './MainPresenter';

const MainContainer = () => {
    const user_num = sessionStorage.getItem('is_logined');

    const [classifications, setClassifications] = useState([]);
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [selectedClassification, setSelectedClassification] = useState("");
    const [priority, setPriority] = useState("상");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/classifications/${user_num}`)
            .then(response => setClassifications(response.data))
            .catch(error => console.error("Error fetching classifications", error));

        axios.get(`http://localhost:8080/todos/${user_num}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error("Error fetching todos", error));
    }, [user_num]);

    const handleAddTodo = () => {
        if (newTodoTitle.trim() === "") {
            alert("투두 제목을 입력하세요.");
            return;
        }

        if (!selectedClassification) {
            alert("분류를 선택하세요.");
            return;
        }

        if (!dueDate) {
            alert("마감 날짜를 입력하세요.");
            return;
        }

        axios.post("http://localhost:8080/todos/add", {
            user_num: user_num,
            title: newTodoTitle,
            classification_name: selectedClassification,
            priority: priority,
            due_date: dueDate
        })
        .then(response => {
            if (response.data.ok) {
                setTodos([...todos, response.data.todo]);
                setNewTodoTitle("");
                setSelectedClassification("");
                setPriority("상");
                setDueDate("");
            } else {
                alert("투두 추가 실패");
            }
        })
        .catch(error => console.error("Error adding todo", error));
    };

    const handleDeleteTodo = (todo_id) => {
        axios.delete(`http://localhost:8080/todos/delete/${todo_id}`)
            .then(response => {
                if (response.data.ok) {
                    setTodos(todos.filter(todo => todo.id !== todo_id));
                } else {
                    alert("투두 삭제 실패");
                }
            })
            .catch(error => console.error("Error deleting todo", error));
    };

    const handleCompleteTodo = (todo_id) => {
        axios.put(`http://localhost:8080/todos/complete/${todo_id}`)
            .then(response => {
                if (response.data.ok) {
                    setTodos(todos.map(todo =>
                        todo.id === todo_id ? { ...todo, complete: true } : todo
                    ));
                } else {
                    alert("투두 완료 처리 실패");
                }
            })
            .catch(error => console.error("Error completing todo", error));
    };

    return (
        <MainPresenter 
            user_num={user_num} 
            todos={todos} 
            classifications={classifications} 
            newTodoTitle={newTodoTitle} 
            selectedClassification={selectedClassification}
            priority={priority}
            dueDate={dueDate}
            setNewTodoTitle={setNewTodoTitle}
            setSelectedClassification={setSelectedClassification}
            setPriority={setPriority}
            setDueDate={setDueDate}
            handleAddTodo={handleAddTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
        />
    );
};

export default MainContainer;
