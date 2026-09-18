import {
  signInWithGoogle,
  getAllUsers,
  getUserById,
} from "./services/auth.services";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function SignIn() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h1>Firebase RTDB</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {users.map((user) => {
          return (
            <div
              key={user.id}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              <Link>Email: {user.email}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SignIn;
