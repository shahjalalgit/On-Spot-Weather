import { CloudCircleRounded } from '@material-ui/icons';
import {
    getAuth, signOut
} from 'firebase/auth';
import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import './Header';
const Header = () => {
    let navigate = useNavigate();
    const [userLoggedInfo, setUserLoggedInfo] = useContext(userContext);
    const auth = getAuth();
    const handleLogOut = async () => {
        signOut(auth);
        setUserLoggedInfo({});
        navigate("/");
        // console.log('Sign Out Success');
    };
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <CloudCircleRounded width="30"
                            height="30"></CloudCircleRounded> {'  '}
                        On-Spot Weather
                    </Navbar.Brand>
                    <Nav className="me-auto link">
                        <Link className="nav-link" to="home" >Home</Link>
                        <Link className="nav-link" to="liveWeather">Live Weather</Link>
                        <Link className="nav-link" to="contact">Contact US</Link>
                        <Link className="nav-link" to ="login">Login</Link>
                        
                    </Nav>
                    {userLoggedInfo.email ? document.getElementById('logout').style.display = 'block' : ''}
                    <button id='logout' style={{width: "100px", display: 'none' }} onClick={handleLogOut}> LogOut </button>
            </Container>
        </Navbar>
        </div >
    );
};

export default Header;