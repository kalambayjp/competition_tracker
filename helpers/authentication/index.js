import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { app } from "../../firebase/clientApp";
import { updateProfile } from "firebase/auth";
import { createUserDoc } from "../users/index"


const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

// AUTHENTICATE WITH GOOGLE
export const authWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
        .then(res => {
            console.log("succesful google auth")
            return createUserDoc(res.user.uid, res.user)
            .then(console.log('successfully created user doc'))
            .catch(e => console.log('error creating user doc', e))
        })
        .catch(e => e.message)
} 

// REGISTER BY EMAIL/PASSWORD
export const regWithEmail = async (e, email, usrName, password, confirmedPassword, setErr) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
        return setErr('Passwords do not match!');
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(async res => {
        
        return updateProfile(res.user, {displayName: usrName})
        .then(async data => {
            
            return createUserDoc(res.user.uid, res.user)
            .then(console.log('created user doc with updated user, 3'))
            .catch(e => console.log('error creating userdoc, 3', e))
        })
        .catch(e => console.log('failed to update user with usrname, 2', e))
    })
    .catch(e => console.log('failed to create user, 1', e))
}

// SIGN IN BY EMAIL/PASSWORD
export const loginWithEmail = async (e, email, password, setErr) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then(usr => console.log('succussfull sign in, user:', usr))
        .catch(e => setErr(e.message))
}

// SIGN OUT
export const logOut = () => {
    return signOut(auth);
}