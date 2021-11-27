import React from 'react';
import s from './passwordRecovery.module.css'
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {passwordRecovery, RecoveryStatusType} from '../../store/passwordRecoveryReducer';
import {Navigate} from 'react-router-dom';
import {AppRootStateType} from '../../store/store';
import {NavLink} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

type InputType = {
    email: string
}

function PasswordRecovery() {

    const messageForEmail = () => {
        return <div style={{'backgroundColor': 'lime', 'padding': '15px'}}>
            password recovery link:
            <a href="https://neko-back.herokuapp.com/2.0/#/set-new-password/$token$">link</a>
        </div>
    }

    const dispatch = useDispatch();

    const appStatus = useSelector<AppRootStateType, RecoveryStatusType>(state => state.app.status);
    const appError = useSelector<AppRootStateType, string>(state => state.app.error);

    const {register, handleSubmit, formState: {errors}} = useForm<InputType>({mode: 'onBlur'});
    const onSubmit: SubmitHandler<InputType> = data => {
        dispatch(passwordRecovery(data.email, messageForEmail))
    };

    if(appStatus === 'succeeded') {
        return <Navigate to={'/checkEmail'}/>
    }

    return (
        <>
            <div className={s.wrapper}>
                {appStatus === 'loading' && <Preloader/>}
                <div className={s.title}>It-incubator</div>
                <div className={s.forgot}>Forgot your password?</div>
                <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className={s.description} htmlFor="email">Email</label>
                        <input type="text"
                               id="email"
                               disabled={appStatus === 'loading'}
                               placeholder={'enter your e-mail'}
                               {...register('email', {
                                   required: {value: true, message: 'Email is required'},
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                       message: 'Invalid email'
                                   },
                               })}/>
                        {errors.email && <div className={s.error}>{errors.email.message}</div>}
                        <label className={s.description} htmlFor="email">Enter your email address and we will send you
                            further instructions </label>
                    </div>
                    <button className={s.mainButton}
                            disabled={appStatus === 'loading'}
                            type="submit">Send Instructions
                    </button>
                    {appError}
                </form>
                <span className={s.remember}>Did you remember your password?</span>

                <NavLink to={'/login'} className={s.tryLogin}
                         style={appStatus === 'loading' ? {pointerEvents: 'none'} : {pointerEvents: 'initial'}}>Try
                    logging in</NavLink>

            </div>
        </>

    );
}

export default PasswordRecovery;