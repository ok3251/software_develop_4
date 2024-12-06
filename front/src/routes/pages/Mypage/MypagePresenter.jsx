import React from "react";
import Layout from "../../../components/Layout/Layout";
import UserInfo from "./component/UserInfo";
import Classification from "./component/Classification";


function MypagePresenter({user_num,userInfo}){

    return(
        <Layout>
            <UserInfo userInfo={userInfo}></UserInfo>
            {user_num && <Classification user_num={user_num}/>}
        </Layout>
            

    )
}

export default MypagePresenter;