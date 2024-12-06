import React, { useState } from "react";

function TodoList({
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
    handleCompleteTodo,
    handleEditTodo
}) {

    const [selectedTodo, setSelectedTodo] = useState(null);
    const day = new Date();
    day.setDate(day.getDate() + 1);
    const minDate = day.toISOString().split("T")[0]

    const getPriorityValue = (priority) => {
        switch (priority) {
            case '상':
                return 3;
            case '중':
                return 2;
            case '하':
                return 1;
            default:
                return 0;
        }
    };

    const sortedTodos = [...todos].sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));

    const getPriorityColor = (priority) => {
        switch (priority) {
            case '상':
                return '#e74c3c';
            case '중':
                return '#2ecc71';
            case '하':
                return '#95a5a6';
            default:
                return '#444';
        }
    };

    const handleItemClick = (todo) => {
        setSelectedTodo(prev => (prev && prev.id === todo.id ? null : todo));
    };

    const handleAction = (action) => {
        if (action === "complete") {
            handleCompleteTodo(selectedTodo.id); 
        } else if (action === "edit") {
            handleEditTodo(selectedTodo.id); 
        } else if (action === "delete") {
            handleDeleteTodo(selectedTodo.id); 
        }
        setSelectedTodo(null); 
    };

    return (
        <div style={styles.container}>
            <div>
                <h3 style={styles.heading}>투두 추가하기</h3>
                <select
                    style={styles.input}
                    value={selectedClassification}
                    onChange={(e) => setSelectedClassification(e.target.value)}
                >
                    <option value="">분류</option>
                    {classifications.map((item, index) => (
                        <option key={index} value={item.classification_name}>
                            {item.classification_name}
                        </option>
                    ))}
                </select>
                <input
                    style={styles.input}
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="투두 제목 입력"
                />
                <select
                    style={styles.input}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                </select>
                <input
                    style={styles.input}
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={minDate}
                />
                <button
                    style={styles.button}
                    onClick={handleAddTodo}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    추가
                </button>
            </div>
            <div>
                <ul style={styles.list}>
                    {sortedTodos.map((todo, index) => (
                        <li key={index} style={styles.listItem} onClick={() => handleItemClick(todo)}>
                            <div style={styles.todoContent}>
                                {todo.classification_name}
                                <strong>{todo.title}</strong>
                                <span style={{...styles.priority, backgroundColor: getPriorityColor(todo.priority)}}>{todo.priority}</span>
                            </div>
                            <div style={styles.dueDate}>
                                {todo.complete === true ? (
                                    <span style={styles.success}>완료됨</span>
                                ) : (
                                    <span>마감일: {todo.due_date}</span>
                                )}
                            </div>
                            {selectedTodo?.id === todo.id && (
                                <div style={styles.actionButtons}>
                                    {todo.complete ===false
                                    ?<button
                                        style={styles.completeButton}
                                        onClick={(e) => {
                                            handleAction("complete");
                                        }}
                                    >
                                        완료
                                    </button>
                                    :''}
                                    <button
                                        style={styles.deleteButton}
                                        onClick={(e) => {
                                            handleAction("delete");
                                        }}
                                    >
                                        삭제
                                    </button>

                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;

const styles = {
    container: {
        backgroundColor: '#f5f5f5',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        backgroundColor: '#333',
        margin: '5px 0',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer',  
    },
    todoContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    priority: {
        padding: '5px 10px',
        borderRadius: '5px',
        marginLeft: '10px',
        color: 'white',
    },
    dueDate: {
        marginTop: '5px',
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },
    actionButtons: {
        width:'100%',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    },
    input: {
        padding: '10px',
        marginRight: '10px',
        border: '1px solid #444',
        borderRadius: '5px',
        backgroundColor: '#222',
        color: 'white',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: 'skyblue',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonHover: {
        backgroundColor: '#555',
    },
    deleteButton: {
        padding: '5px 10px',
        border: 'none',
        backgroundColor: '#e74c3c',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        width:'100%'
    },
    completeButton: {
        padding: '5px 10px',
        border: 'none',
        backgroundColor: '#2ecc71',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        width:'100%'
    },

    success: {
        padding: '5px 10px',
        backgroundColor: '#28a745',
        color: 'white',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '14px',
        border: '1px solid #218838',
        textAlign: 'center',
        width: 'fit-content',
        marginTop: '5px',
    }
};
