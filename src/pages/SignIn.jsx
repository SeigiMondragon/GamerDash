import {
  signInWithGoogle,
  getAllUsers,
  getUserById,
} from "../services/auth.services";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, Stack } from "@mantine/core";
function SignIn() {
  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h1>Login</h1>
      <Stack
        size="xl"
        spacing="xs"
        mx="auto"
        bd="1px solid black"
        p="xl"
        mt="md"
        bdrs="md"
      >
        <TextInput label="Email" placeholder="Enter your email" />
        <TextInput label="Password" placeholder="Enter your password" />
        <Button type="submit">Sign In</Button>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      </Stack>
    </>
  );
}

export default SignIn;
