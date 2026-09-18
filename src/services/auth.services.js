import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider, db } from "../lib/firebase";
import { ref, push, onValue, remove } from "firebase/database";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithRedirect(auth, provider);
    if (result.user) {
      addUser(result.user.email, result.user.displayName);
      return { user: result.user, success: true };
    }
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const registerWithEmail = async (email, password, name) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) {
      addUser(result.user.email, name);
    }
    return { user: result?.user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result?.user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

const addUser = async (email, name) => {
  const userRef = ref(db, "users");
  push(userRef, {
    email: email,
    name: name,
  })
    .catch((error) => {
      throw new Error("Error adding user: " + error.message);
    })
    .then(() => {
      console.log("User added successfully");
    });
};

export const getAllUsers = async (callback) => {
  try {
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      const users = [];
      const data = snapshot.val();
      callback(Object.entries(data).map(([id, user]) => ({ id, ...user })));
    });
  } catch (error) {}
};

export const getUserById = async (userId, callback) => {
  const userRef = ref(db, `users/${userId}`);
  return onValue(
    userRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback({ id: userId, ...data });
      }
    },
    (error) => {
      console.error("Error fetching user:", error);
    },
  );
};

export const updateUser = async (userId, updatedData) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    await set(userRef, updatedData);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    await remove(userRef);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
