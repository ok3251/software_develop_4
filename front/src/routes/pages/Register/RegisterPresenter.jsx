import Layout from "../../../components/Layout/Layout";
import React from "react";

function RegisterPresenter({userInfo,styles,checkIdDuplicate,handleUserInfoChange,showIdDuplicateStatus,checkPasswordMatch,showPasswordMatchStatus,handleSignUp}) {
    
    return (
        <Layout>
            <div className="RegisterContainer" style={styles.container}>
                <h2>회원가입</h2>

                <div className="input_title" style={styles.label}>ID</div>
                <input
                    name='id'
                    style={styles.input}
                    onChange={(e) => { handleUserInfoChange(e) }}
                />
                {userInfo.id.length >= 4 ? <label style={styles.successLabel}>조건충족됨</label> :
                    <label style={styles.errorLabel}>4글자  이상으로 쓰세요</label>}
                <button style={{ ...styles.button, ...styles.checkButton }} onClick={() => { checkIdDuplicate() }}>
                    아이디 확인하기
                </button>
                {showIdDuplicateStatus()}

                <div className="input_title" style={styles.label}>Password</div>
                <input
                    type='password'
                    name='password'
                    style={styles.input}
                    onChange={(e) => { handleUserInfoChange(e) }}
                />

                <div className="input_title" style={styles.label}>Password Confirm</div>
                <input
                    type='password'
                    name="passwordConfirm"
                    style={styles.input}
                    onChange={(e) => { handleUserInfoChange(e) }}
                />
                <button style={{ ...styles.button, ...styles.checkButton }} onClick={() => checkPasswordMatch()}>
                    비밀번호 확인하기
                </button>
                {showPasswordMatchStatus()}

                <div className="input_title" style={styles.label}>Name</div>
                <input
                    name="name"
                    style={styles.input}
                    onChange={(e) => { handleUserInfoChange(e) }}
                />

                <button style={{ ...styles.button, ...styles.signUpButton }} onClick={() => handleSignUp()}>
                    회원가입 하기
                </button>
            </div>
        </Layout>
    )
}

export default RegisterPresenter;



