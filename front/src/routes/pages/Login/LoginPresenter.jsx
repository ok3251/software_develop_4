import Layout from "../../../components/Layout/Layout";
import React from "react";


function LoginPresenter({styles,handleInputChange,login,successStatus,GoRegister}) {

    
    return (
        <Layout>
            <div className="Login" style={styles.container}>
                <h2>로그인</h2>
                <input 
                    style={styles.input} 
                    name='id' 
                    placeholder="ID" 
                    onChange={(e) => handleInputChange(e)} 
                />
                <input 
                    style={styles.input} 
                    type='password' 
                    name='password' 
                    placeholder="Password" 
                    onChange={(e) => handleInputChange(e)} 
                />
                <button 
                    style={{ ...styles.button, ...styles.loginButton }} 
                    onClick={() => login()}
                >
                    Login
                </button>
                <div>
                    {successStatus.loginSuccess === undefined ? null : (successStatus.loginSuccess === true ? 
                        null : <label style={styles.label}>로그인에 실패했어용!</label>)}
                </div>
                <button 
                    style={{ ...styles.button, ...styles.registerButton }} 
                    onClick={() => GoRegister()}
                >
                    회원가입하러가기
                </button>
            </div>
        </Layout>
    );
}

export default LoginPresenter;


