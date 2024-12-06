import React, { useState, useEffect } from "react";
import axios from "axios";

function Classification({ user_num }) {
    const [classifications, setClassifications] = useState([]);
    const [newClassification, setNewClassification] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/classifications/${user_num}`)
            .then(response => {
                console.log(response.data);
                setClassifications(response.data); 
            })
            .catch(error => {
                console.error("Error fetching classifications", error);
            });
    }, [user_num]);

    const handleAddClassification = () => {
        if (newClassification.trim() === "") {
            return;
        }

        const isExistingClassification = classifications.some(item => item.classification_name === newClassification.trim());

        if (isExistingClassification) {
            alert("이미 보유중인 분류입니다.");
            return;
        }

        axios.post("http://localhost:8080/classification/add", {
            user_num: user_num,
            classification_name: newClassification
        })
        .then(response => {
            if (response.data.ok) {
                setClassifications([...classifications, response.data.classification]); 
                setNewClassification("");
            } else {
                alert("분류 추가 실패");
            }
        })
        .catch(error => {
            console.error("Error adding classification", error);
        });
    };

    const handleDeleteClassification = (classification_num) => {
        axios.delete(`http://localhost:8080/classification/delete/${classification_num}`)
            .then(response => {
                if (response.data.ok) {
                    setClassifications(classifications.filter(item => item.classification_num !== classification_num));
                } else {
                    alert("분류 삭제 실패");
                }
            })
            .catch(error => {
                console.error("Error deleting classification", error);
            });
    };

    return (
        <div style={styles.container}>
            <div>
                <h3 style={styles.heading}>분류</h3>
                <ul style={styles.list}>
                    {classifications.map((item, index) => (
                        <li key={index} style={styles.listItem}>
                            {item.classification_name}
                            {item.classification_name !== '일반' && (
                                <button 
                                    style={styles.deleteButton}
                                    onClick={() => handleDeleteClassification(item.classification_num)}
                                >
                                    삭제
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 style={styles.heading}>분류 추가하기</h3>
                <input
                    style={styles.input}
                    type="text"
                    value={newClassification}
                    onChange={(e) => setNewClassification(e.target.value)}
                    placeholder="새 분류 입력"
                />
                <button
                    style={styles.button}
                    onClick={handleAddClassification}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    추가
                </button>
            </div>
        </div>
    );
}

export default Classification;

const styles = {
    container: {
        backgroundColor: '#f5f5f5',
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
    },
    heading: {
        color: 'black',
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
        color:'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: '#444',
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
    }
};
