import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import firebaseConfig from '../Firebase/firebase.config';


const app = initializeApp(firebaseConfig);
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const {displayName,email,emailVerified,photoURL} = loggedInUser;
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const handleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);
        setLoggedInUser(result.user);
        console.log(result.user);
        

        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         // ...
        //         setLoggedInUser(user);
        //         console.log(user);
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The AuthCredential type that was used.
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });
    };

    const handleSignOut = async () => {
        signOut(auth);
        setLoggedInUser({});
        console.log('Sign Out Success');
    }
    
    // const handleSignOut = () =>{
    //     signOut(auth).then(() => {
    //         setLoggedInUser({});
    //         console.log('Sign Out Success'); // Sign-out successful.
    //       }).catch((error) => {
    //         console.log('Sign Out Error');// An error happened.
    //       });
    // }
    return (
        <div>
            <h1  className='text-center'>Firebase Authentication</h1>
            <GoogleButton onClick={handleSignIn} />
            <Button className="p-4 m-3" onClick={handleSignOut}> Sign Out </Button>
            <div className="border border-secondary bg-secondary text-white m-5 p-5">
                <p className="d-flex flex-row ">
                    <div>
                    User Name: {displayName} <br/>
                    Email: {email} <br/>
                    Verifications: {emailVerified && 'Yes'} <br/>
                    </div>
                    <img style={{width:'200px'}} src={photoURL} />
                </p>
                
            </div>
        </div>
    );
};

export default Login;
