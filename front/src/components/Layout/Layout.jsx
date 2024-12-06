import React from "react";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Article from "../Article/Article";
import './Layout.css';

const Layout = ({
    children,
}) => {

    return (
        <div className="layout">
            <Header
            />
            <Article children={children} />
            <Nav />
        </div>
    )
}

export default Layout;