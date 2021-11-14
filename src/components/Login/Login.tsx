import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Login.module.css'
import {setIsLoggedIn} from '../../store/loginReducer';
import {AppRootStateType} from '../../store/store';

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state:AppRootStateType)=> state.login.isLoggedIn)

    const onLogin = () => {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
    }

    /*if (isLoggedIn) {
        'redirect to profile'
    }*/

    return (
        <div className={s.wrapper}>
            <div className={s.title}>It-incubator</div>
            <div className={s.signIn}>Sign in</div>
            <form className={s.formContainer}>
                <div>
                    <label className={s.description} htmlFor="email">Email</label>
                    <input type="text" id="email" name="username" placeholder={'enter your e-mail'}/>
                </div>

                <div>
                    <label className={s.description} htmlFor="pass">Password</label>
                    <input type="password" id="pass" name="password" placeholder={'enter your password'}/>
                </div>
                <a className={s.forgotPass}>Forgot Password</a>
                <button className={s.mainButton} onClick={onLogin}>Login</button>
            </form>
            <span className={s.withoutAcc}>Don't have an account?</span>

            <a className={s.signUp}>Sign Up</a>

        </div>
    )
}