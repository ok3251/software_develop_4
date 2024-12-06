import { useState,useEffect } from "react";
import LoginPresenter from "./LoginPresenter";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginContainer = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        id: '',
        password: '',
    });
    const [successStatus, setSuccessStatus] = useState({
        loginSuccess: undefined,
    });

    useEffect(() => {
        if (successStatus.loginSuccess === true) {
            alert('로그인 성공했어용')
            navigate('/');
        }
    }, [successStatus.loginSuccess, navigate]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }

    function login() {
        axios.get(`http://localhost:8080/login/${userInfo.id}/${userInfo.password}`)
            .then((res) => {
                if (res.data.ok) {
                    sessionStorage.setItem('is_logined', res.data.user_num);
                }
                setSuccessStatus(prev => ({ ...prev, loginSuccess: res.data.ok }));
            })
            .catch((err) => {
                console.error(err);
            });
    }
    function GoRegister(){
        navigate('/register')
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
        },
        loginButton: {
            backgroundColor: 'black',
            color: 'white',
        },
        registerButton: {
            backgroundColor: 'grey',
            color: 'white',
        },
        label: {
            color: 'red',
            fontSize: '14px',
        }
    };

    

    return <LoginPresenter styles ={styles} handleInputChange={handleInputChange} login={login} successStatus={successStatus} GoRegister={GoRegister}/>
}

export default LoginContainer;