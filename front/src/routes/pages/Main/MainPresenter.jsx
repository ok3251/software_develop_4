import React from "react";
import Layout from "../../../components/Layout/Layout";
import TodoList from "./component/Todo";

const MainPresenter = ({
    user_num,
    todos,
    classifications,
    newTodoTitle,
    selectedClassification,
    priority,
    dueDate,
    setNewTodoTitle,
    setSelectedClassification,
    setPriority,
    setDueDate,
    handleAddTodo,
    handleDeleteTodo,
    handleCompleteTodo
}) => {
    const session = sessionStorage.getItem('is_logined');
    
    return (
        <Layout>
            {session > 0 
                ? (
                    <div>
                        <TodoList 
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
                    </div>
                )
                : <div>로그인 후 사용 가능합니다.</div>
            }
        </Layout>
    );
};

export default MainPresenter;
