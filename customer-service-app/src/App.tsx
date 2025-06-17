import { Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up-admin" element={<SignUp  />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
}

export default App;
