import { auth, googleProvider } from '../config/firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { register, loginUser, googleLogin, updateUserReg } from '../model/userModel.js';

export const signupWithEmail = async (name, email, password, role, isHotelRegistered) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await register({ uid: user.uid, name, email, role, isHotelRegistered });
};

export const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const response = await loginUser(user.uid);
    localStorage.setItem("user", JSON.stringify(response.data)); // ✅ JSON.stringify
    localStorage.setItem("userId", user.uid);                   // ✅ simple string

    return response.data;
};

export const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const response = await googleLogin(user.email.toLowerCase());
    localStorage.setItem("user", JSON.stringify(response.data)); // ✅ JSON.stringify
    localStorage.setItem("userId", user.uid);

    return response.data;
};

export const updateUser = async (userId, name, email, role, isHotelRegistered) => {
    const response = await updateUserReg({ userId, name, email, role, isHotelRegistered });
    return response.data;
};
