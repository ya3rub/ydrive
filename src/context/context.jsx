import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    async function signUp(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }
    async function logOut() {
        return await signOut(auth);
    }
    async function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return await signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(false);
            setUser(currentUser);
        });
        // un-listen after component is unmounted
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <userAuthContext.Provider
            value={{ user, signUp, login, logOut, googleSignIn, isLoading }}
        >
            {children}
        </userAuthContext.Provider>
    );
};

export function useUserAuth() {
    return useContext(userAuthContext);
}
