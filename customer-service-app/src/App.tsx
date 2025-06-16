import { Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up-admin" element={<SignUp  />} />
        </Routes>
    );
}

export default App;
