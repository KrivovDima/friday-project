import {useDispatch, useSelector} from 'react-redux';
import s from './Profile.module.css'
import {logoutTC} from '../../store/loginReducer';
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';


export const Profile = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const userData = useSelector((state: AppRootStateType) => state.login.userData)

    const onLogout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Profile</div>
            <span className={s.userData}>User Name: {userData.name}</span>
            <span className={s.userData}>User Email: {userData.email}</span>
            <span className={s.userData}><img alt='avatar' style={{width: '150px'}} src={userData.avatar}/></span>
            <span className={s.userData}>Cards Count: {userData.publicCardPacksCount}</span>
            <span className={s.userData}>Created: {userData.created}</span>
            <span className={s.userData}>Last Updated: {userData.updated}</span>
            {userData.isAdmin && <span className={s.userData}>Administrator</span>}
            <button className={s.mainButton} onClick={onLogout}>Logout</button>
        </div>
    )
}