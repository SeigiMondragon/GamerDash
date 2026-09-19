import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import User from "./pages/User.jsx";
import Authlayout from "./layout/Authlayout.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Authlayout />}>
          <Route path="/" element={<SignIn />} />
        </Route>
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
