import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import User from "./pages/User.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
