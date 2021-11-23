import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import TestPage from './components/TestPage/TestPage';
import CheckEmail from './components/PasswordRecovery/checkEmail/CheckEmail';
import {Profile} from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import InputNewPassword from './components/InputNewPassword/InputNewPassword';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {initializeAPP} from './store/appReducer';

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAPP())

    }, [])

    const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized)
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const minPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.minCardsCount)
    const maxPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.maxCardsCount)
    const currentPage = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.page)
    const currentPageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.pageCount)
    const currentCardsPage = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.page)
    const currentCardsPageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.pageCount)


    /*useEffect(()=>{
        dispatch('Thunk') //запрос на сервер за колодами и картами
    }, [minPacksCount,maxPacksCount, currentPage, currentPageCount, currentCardsPage, currentCardsPageCount])
*/
    if (!isInitialized) {
        return <div> Loading... </div>
    }


    return (
        <div className="App">
            <div className="AppInner">
                <Routes>
                    <Route path="/" element={<Profile/>}/>
                    <Route path="testPage" element={<TestPage/>}/>
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
