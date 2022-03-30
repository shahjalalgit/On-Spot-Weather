import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { userContext } from '../../App';
import initializeAuthentication from '../Firebase/firebase.init';


initializeAuthentication();

const LoginWithContextAPI = () => {
    const [userLoggedInfo, setUserLoggedInfo] = useContext(userContext);

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleLogIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const { displayName, email, photoURL } = result.user;
        const userInfo = { name: displayName, email: email, photo: photoURL, password: '', error: '', success: false};
        console.log(userInfo);
        setUserLoggedInfo(userInfo);
    };
    const handleLogOut = async () => {
        signOut(auth);
        setUserLoggedInfo('');
        console.log('Sign Out Success');
    };
    const display = () => {
        const info = document.getElementById('info');
        userLoggedInfo.email ? (info.style.display = 'block') : (info.style.display = 'none');
    };

    const handleSubmit = (e) => {
        if (userLoggedInfo.email && userLoggedInfo.password) {
            console.log(userLoggedInfo.email, userLoggedInfo.password);
            createUserWithEmailAndPassword(auth, userLoggedInfo.email, userLoggedInfo.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    const newUserinfo = {...userLoggedInfo};
                    newUserinfo.success = true;
                    newUserinfo.error = '';
                    setUserLoggedInfo(newUserinfo);

                })
                .catch((error) => {
                    const newUserinfo = {...userLoggedInfo};
                    newUserinfo.success = false;
                    newUserinfo.error = error.message;                  
                    setUserLoggedInfo(newUserinfo);
                });
        }
        e.preventDefault();
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

    return (
        <div>
            <h1 className='text-center'>Login with Context API</h1>
            <div>
                <div>
                    <Form onSubmit={handleSubmit} className='m-5'>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onBlur={handleChange}
                                name='email'
                                type='email'
                                placeholder='Enter email'
                                required
                            />
                            <Form.Text className='text-muted'>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name='password'
                                type='password'
                                placeholder='Password'
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                        <p>{userLoggedInfo.error}</p>
                        {userLoggedInfo.success && <p>User sign-up successful</p>}
                    </Form>
                    <div className='text-center'>
                        <Button id='signInBtn' onClick={handleLogIn}>
                            login with Google
                        </Button>
                        <Button className='btn btn-danger ml-4' onClick={handleLogOut}>
                            LogOut from Google
                        </Button>

                        <h1 id='info'>
                            Name: {userLoggedInfo.name} <br />
                            Email: {userLoggedInfo.email} <br />
                            Password: {userLoggedInfo.password} <br />
                            <img src={userLoggedInfo.photo} alt={userLoggedInfo.name} />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginWithContextAPI;
