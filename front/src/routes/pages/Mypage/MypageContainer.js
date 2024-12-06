import { useEffect, useState } from "react";
import MypagePresenter from "./MypagePresenter";
import axios from "axios";

const MypageContainer = () => {
    const user_num = sessionStorage.getItem('is_logined');

    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        if (user_num) {
            axios.get(`http://localhost:8080/mypage/userinfo/${user_num}`)
                .then((res) => {
                    setUserInfo(res.data.name);  
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            console.error("User not logged in.");
        }
    }, [user_num]);

    return <MypagePresenter user_num={user_num} userInfo={userInfo} />;
}

export default MypageContainer;
