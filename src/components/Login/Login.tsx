import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import s from './Login.module.css'
import {loginTC} from '../../store/loginReducer';
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';

type Inputs = {
    email: string,
    password: string,
    rememberMe: boolean,
};

export const Login = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const error = useSelector((state: AppRootStateType) => state.login.userData.error)

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => dispatch(loginTC(data));

    // {email: 'nya-admin@nya.nya', password: '1qazxcvBG', rememberMe: false} for tests

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.title}>It-incubator</div>
            <div className={s.signIn}>Sign in</div>
            <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.inputWrapper}>
                    {errors.email ? <span className={s.errorMassage}>{errors.email.message}</span> :
                        <label className={s.description} htmlFor="email">Email</label>}
                    <input type="text"
                           placeholder={'enter your e-mail'}
                           {...register('email', {
                               required: true,
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                   message: 'Invalid email address'
                               }
                           })}/>
                </div>
                <div className={s.inputWrapper}>
                    {errors.password ? <span className={s.errorMassage}>{errors.password.message}</span> :
                        <label className={s.description} htmlFor="password">Password</label>}
                    <input type="password"
                           placeholder={'enter your password'}
                           {...register('password', {
                               required: true,
                               minLength: {
                                   value: 8,
                                   message: 'Password must have at least 8 characters'
                               }
                           })}/>
                </div>
                <div className={s.rememberMeWrapper}>
                    <label className={s.rememberMe}>
                        <input type="checkbox" defaultChecked={false}
                               {...register('rememberMe', {required: false})}/>
                        Remember Me
                    </label>
                </div>
                <a className={s.forgotPass}>Forgot Password</a>
                {error && <span className={`${s.errorMassage} ${s.serverError}`}>Connection error: {error}</span>}
                <button type={'submit'} className={s.mainButton}>Login</button>
            </form>
            <span className={s.withoutAcc}>Don't have an account?</span>
            <a className={s.signUp}>Sign Up</a>
        </div>
    )
}