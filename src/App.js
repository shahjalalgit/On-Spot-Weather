import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ContactUS from './Components/ContactUS/ContactUS';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import LiveWeather from './Components/LiveWeather/LiveWeather';
import Login from './Components/Login/Login.js';
export const userContext = createContext();
function App() {
    const [userLoggedInfo, setUserLoggedInfo] = useState({ name: '', email: '', photo: '', password: '', error: '', success: false});
    return (
        <div>
            <userContext.Provider value={[userLoggedInfo, setUserLoggedInfo]}>
            <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />}/>
                    <Route path='/liveWeather' element={<LiveWeather/>}/>
                    <Route path='/contact' element={<ContactUS />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </userContext.Provider>
        </div>
    );
}

export default App;
