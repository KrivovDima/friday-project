import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import Registration from './components/Registration/Registration';
import InputNewPassword from './components/InputNewPassword/InputNewPassword';
import TestPage from './components/TestPage/TestPage';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<TestPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/passwordRecovery'} element={<PasswordRecovery/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/inputNewPassword'} element={<InputNewPassword/>}/>
            </Routes>
        </div>
    );
}

export default App;
