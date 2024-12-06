import React from "react";
import './Nav.css';
import { useNavigate } from "react-router-dom";
const Nav = ({

}) => {

    const navigate = useNavigate();
    return (
        <nav>
            <ul>
                <li className="nav_btn">
                    <div onClick={()=>{alert('업데이트 예정입니다.')}}>달력</div>
                </li>
                <li className="nav_btn">
                    <div onClick={()=>{navigate('/')}}>홈</div>
                </li>
                <li className="nav_btn">
                    <div onClick={()=>{navigate('/mypage')}}>마이페이지</div>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;