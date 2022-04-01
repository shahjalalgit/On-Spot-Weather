import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import initializeAuthentication from '../Firebase/firebase.init';
import googleBrandLogIn from '../Images/google-brands-logIn.svg';
import googleBrand from '../Images/google-brands.svg';
import './Login.css';


initializeAuthentication();

const Login = () => {
    const [userLoggedInfo, setUserLoggedInfo] = useContext(userContext);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const { displayName, email, photoURL } = result.user;
        const userInfo = { name: displayName, email: email, photo: photoURL, success: true };
        setUserLoggedInfo(userInfo);
        userLoggedInfo.success && alert('Sign-Up Success');
        navigate(from, { replace: true });
    };
    const handleLogOut = async () => {
        signOut(auth);
        setUserLoggedInfo({});
        // console.log('Sign Out Success');
    };

    const handleSubmit = (e) => {
        if (userLoggedInfo.email && userLoggedInfo.password) {
            // console.log(userLoggedInfo.email, userLoggedInfo.password);
            createUserWithEmailAndPassword(auth, userLoggedInfo.email, userLoggedInfo.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    alert('Sign-Up Success');
                })
                .catch((error) => {
                    const newUserinfo = { ...userLoggedInfo };
                    // newUserinfo.success = false;
                    newUserinfo.error = error.message;
                    setUserLoggedInfo(newUserinfo);
                    userLoggedInfo.error && alert(userLoggedInfo.error);
                });
        }
        e.preventDefault();
    };
    const handleLogin = () => {
        if (userLoggedInfo.email && userLoggedInfo.password) {
        signInWithEmailAndPassword(auth, userLoggedInfo.email, userLoggedInfo.password)
            .then((userCredential) => {
                console.log('singing in');
                const user = userCredential.user;
                // ...
                console.log('user: ',user);
                // const newUserinfo = { ...userLoggedInfo};
                //     newUserinfo.success = true;
                //     newUserinfo.error = '';
                //     newUserinfo.name = user.name;
                //     newUserinfo.email = user.email;
                //     setUserLoggedInfo(newUserinfo);
                //     alert('login Success');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        }
    };
    const handleChange = (event) => {
        let isFormValid = 'true';
        console.log(event.target.name, event.target.value);
        if (event.target.name === 'email') {
            isFormValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
            //    console.log(isEmailValid);
        }
        if (event.target.name === 'password') {
            isFormValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
            // console.log(isPasswordValid);
        }
        if (isFormValid) {
            const newUserInfo = { ...userLoggedInfo };
            newUserInfo[event.target.name] = event.target.value;
            setUserLoggedInfo(newUserInfo);
        }
    };
    console.log(userLoggedInfo);
    return (
        <div className='body'>
            <div className='main'>
                <input type='checkbox' id='chk' aria-hidden='true' />
                <div className='signup'>
                    <form>
                        <label for='chk' aria-hidden='true'>
                            Sign up
                        </label>
                        <input
                            onBlur={handleChange}
                            type='text'
                            name='name'
                            placeholder='User name'
                            required=''
                        />
                        <input
                            onBlur={handleChange}
                            type='email'
                            name='email'
                            placeholder='Email'
                            required=''
                        />
                        <input
                            onBlur={handleChange}
                            type='password'
                            name='password'
                            placeholder='Password'
                            required=''
                        />
                        <button onClick={handleSubmit} type='submit'>
                            Submit
                        </button>
                    </form>
                    <div style={{ color: 'white', textAlign: 'center' }}>
                        <img
                            onClick={handleSignIn}
                            className='googleBrand'
                            src={googleBrand}
                            alt='Google Sign-UP'
                        />
                        <small>or sign-up using Google</small>
                    </div>
                </div>

                <div className='login'>
                    <form>
                        <label for='chk' aria-hidden='true'>
                            Login
                        </label>
                        <input onBlur={handleChange} type='email' name='email' placeholder='Email' required='' />
                        <input onBlur={handleChange} type='password' name='password' placeholder='Password' required='' />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                    <div style={{ color: 'black', textAlign: 'center' }}>
                        <img
                            onClick={handleSignIn}
                            className='googleBrand'
                            src={googleBrandLogIn}
                            alt='Google LogIn'
                        />
                        <small>or login using Google</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
