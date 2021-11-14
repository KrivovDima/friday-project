import React from 'react';
import {useDispatch} from 'react-redux';
import s from './Login.module.css'

export const Login = () => {
    const dispatch = useDispatch()

    const onLogin = () => {

    }

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
                <button className={s.mainButton}>Login</button>
            </form>
            <span className={s.withoutAcc}>Don't have an account?</span>

            <a className={s.signUp}>Sign Up</a>

        </div>
    )
}