import { CloudCircleRounded } from '@material-ui/icons';
import {
    getAuth,
    signOut
} from 'firebase/auth';
import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { userContext } from '../../App';
import './Header';
const Header = () => {
    const [userLoggedInfo, setUserLoggedInfo] = useContext(userContext);
    const auth = getAuth();
    const handleLogOut = async () => {
        signOut(auth);
        setUserLoggedInfo({});
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
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/liveWeather">Live Weather</Nav.Link>
                        <Nav.Link href="/contact">Contact US</Nav.Link>
                        <Nav.Link href="/login">LogIn</Nav.Link>
                        {userLoggedInfo.email && <Nav.Link onClick="handleLogOut" href="/">LogOut</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;