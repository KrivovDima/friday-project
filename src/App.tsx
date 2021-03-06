import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';

import CheckEmail from './components/PasswordRecovery/checkEmail/CheckEmail';
import {Profile} from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import InputNewPassword from './components/InputNewPassword/InputNewPassword';
import Header from './components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {initializeAPP} from './store/appReducer';
import TestPage from './components/TestPage/TestPage';
import {PacksList} from './components/PacksList/PacksList';
import Preloader from './components/Preloader/Preloader';
import {CardsList} from './components/CardsList/CardsList';
import {CardsLearning} from './components/CardsLearning/CardsLearning';

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAPP())
    }, [])

    const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized)
    const error = useSelector((state: AppRootStateType) => state.app.error)

    if (!isInitialized) {
        return <Preloader/>
    }


    return (
        <div className="App">
            <div className="AppInner">
                <Header/>
                {error && <div className={'Error'}>{error}</div>}
                <Routes>
                    {/*<Route path="/" element={<PacksList/>}/>*/}
                    <Route path="packsList" element={<PacksList/>}/>
                    <Route path="cardsList" element={<CardsList/>}/>
                    <Route path="cardsLearning" element={<CardsLearning/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="passwordRecovery" element={<PasswordRecovery/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="set-new-password/:token" element={<InputNewPassword/>}/>
                    <Route path="checkEmail" element={<CheckEmail/>}/>
                    <Route path="testPage" element={<TestPage/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
