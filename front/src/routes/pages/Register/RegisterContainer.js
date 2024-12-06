import RegisterPresenter from "./RegisterPresenter";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const RegisterContainer = () =>{
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        id: '',
        password: '',
        passwordConfirm: '',
        name: '',
    });
    const [idDuplicateStatus, setIdDuplicateStatus] = useState();
    const [passwordMatchStatus, setPasswordMatchStatus] = useState();

    function checkIdDuplicate() {
        if(userInfo.id.length < 5){
            return alert('아이디를 4글자 이상 써주세요')
        }
        axios.get('http://localhost:8080/idcheck/' + userInfo.id)
            .then((res) => {
                setIdDuplicateStatus(res.data.ok);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleUserInfoChange(e) {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    }

    function showIdDuplicateStatus() {
        if (idDuplicateStatus === true) return <label style={styles.successLabel}>가입 가능한 아이디입니다.</label>;
        if (idDuplicateStatus === false) return <label style={styles.errorLabel}>이미 존재하는 아이디래용.</label>;
        return '';
    }

    function checkPasswordMatch() {
        if (userInfo.password === userInfo.passwordConfirm) {
            setPasswordMatchStatus(true);
        } else {
            setPasswordMatchStatus(false);
        }
    }

    function showPasswordMatchStatus() {
        if (passwordMatchStatus === true) return <label style={styles.successLabel}>비밀번호 일치하네용</label>;
        if (passwordMatchStatus !== true) return <label style={styles.errorLabel}>비밀번호 일치하지 않네용</label>;
    }

    function handleSignUp() {
        if (!userInfo.id || !userInfo.password || !userInfo.passwordConfirm || !userInfo.name) {
            alert('모든 항목을 채워주세요.');
            return;
        }
    
        if (idDuplicateStatus === undefined) {
            alert('아이디 확인을 해주세요.');
            return;
        }
    
        if (passwordMatchStatus === undefined) {
            alert('비밀번호 확인을 해주세요.');
            return;
        }
        axios.post(`http://localhost:8080/signup`,{id : userInfo.id, pw : userInfo.password, name : userInfo.name})
            .then(() => {
                alert('회원가입에 성공했습니다.');
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                alert('회원가입에 실패했습니다.');
            });
    }
    
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        },
        input: {
            marginBottom: '10px',
            padding: '8px',
            width: '200px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '10px',
            marginTop: '10px',
        },
        checkButton: {
            backgroundColor: 'black',
            color: 'white',
        },
        signUpButton: {
            backgroundColor: 'black',
            color: 'white',
        },
        label: {
            marginBottom: '10px',
        },
        successLabel: {
            color: 'green',
            fontSize: '14px',
        },
        errorLabel: {
            color: 'red',
            fontSize: '14px',
        }
    }



    return <RegisterPresenter 
    checkIdDuplicate={checkIdDuplicate}
    handleUserInfoChange={handleUserInfoChange}
    showIdDuplicateStatus={showIdDuplicateStatus}
    checkPasswordMatch={checkPasswordMatch}
    showPasswordMatchStatus={showPasswordMatchStatus}
    handleSignUp={handleSignUp}
    userInfo={userInfo}
    styles={styles}
    />
    
}

export default RegisterContainer
