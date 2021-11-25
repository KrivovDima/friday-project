import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';

import CheckEmail from './components/PasswordRecovery/checkEmail/CheckEmail';
import {Profile} from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import InputNewPassword from './components/InputNewPassword/InputNewPassword';
import Header from "./components/Header/Header";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {initializeAPP} from './store/appReducer';
import TestPage from "./components/TestPage/TestPage";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAPP())

    }, [])

    const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized)


    if (!isInitialized) {
        return <div> Loading... </div>
    }


    return (
        <div className="App">
            <div className="AppInner">
                <Header/>
                <Routes>
                    <Route path="/" element={<TestPage/>}/>
                    <Route path="packList" element={<TestPage/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="passwordRecovery" element={<PasswordRecovery/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="set-new-password/:token" element={<InputNewPassword/>}/>
                    <Route path="checkEmail" element={<CheckEmail/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
