import {useDispatch, useSelector} from 'react-redux';
import s from './Profile.module.css'
import {logoutTC} from '../../store/loginReducer';
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';
import {requestCardPack} from '../../store/cardPacksReducer';
import Preloader from '../Preloader/Preloader';


export const Profile = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const userData = useSelector((state: AppRootStateType) => state.login.userData)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    useEffect(()=>{
        isLoggedIn && dispatch(requestCardPack())
    },[])

    const onLogout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.wrapper}>
            {appStatus === 'loading' ? <Preloader/> : null}
            <div className={s.title}>Profile</div>
            <span className={s.userData}>User Name: {userData.name}</span>
            <span className={s.userData}>User Email: {userData.email}</span>
            <span className={s.userData}><img alt='avatar' style={{width: '150px'}} src={userData.avatar}/></span>
            <span className={s.userData}>Cards Count: {userData.publicCardPacksCount}</span>
            <span className={s.userData}>Created: {userData.created}</span>
            <span className={s.userData}>Last Updated: {userData.updated}</span>
            {userData.isAdmin && <span className={s.userData}>Administrator</span>}
            <button
                className={s.mainButton}
                disabled={appStatus === 'loading'}
                onClick={onLogout}>
                Logout
            </button>
        </div>
    )
}