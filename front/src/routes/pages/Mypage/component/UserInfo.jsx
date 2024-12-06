import React from "react";

function UserInfo({userInfo}) {

    return(
        <div style={styles.userInfoContainer}>
            <div style={styles.userPhoto}>
                <span style={styles.avatar}>T</span>
            </div>
            <div style={styles.userProfile}>
                {userInfo 
                ? <div style={styles.userDetails}>
                    <div style={styles.userId}>{userInfo}님 환영합니다.</div>
                    <button onClick={()=>{
                        sessionStorage.clear()
                        window.location.reload();
                    }
                    }>로그아웃</button>
                  </div>
                : <a href="/login" style={styles.loginLink}>로그인하러가기</a>}
            </div>
        </div>
    )
}

export default UserInfo;

const styles = {
    userInfoContainer: {
        width: "100%",
        height: "15vh",
        backgroundColor: "#f5f5f5",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "0 20px",
        boxSizing: 'border-box',
        borderBottom: "1px solid #ddd"
    },

    userPhoto: {
        width: '5vw',
        height: '10vh',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #ddd',
    },

    avatar: {
        fontSize: "2.2rem",
        color: "#888",
        fontWeight: "bold"
    },

    userProfile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    userDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: '14px',
    },

    userId: {
        fontWeight: 'bold',
        color: '#333',
    },

    userNickname: {
        color: '#777',
    },

    loginLink: {
        color: "#007BFF",
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};
