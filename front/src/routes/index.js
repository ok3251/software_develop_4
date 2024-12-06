import { Main, Register, Mypage, Login } from "./pages";
import { Route, Routes } from 'react-router-dom';



const Router =() => {
    return(
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<Main/>}
                />
                <Route
                    path="/register"
                    element={<Register/>}
                    />
                <Route
                    path="/mypage"
                    element={<Mypage/>}
                    />
                <Route
                    path="/login"
                    element={<Login/>}
                    />

            </Routes>
        </div>
    )
}

export default Router;