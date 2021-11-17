import React from 'react';
import s from './passwordRecovery.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {passwordRecovery, RecoveryStatusType} from "../../store/passwordRecoveryReducer";
import {Navigate} from "react-router-dom";

type InputType = {
    email: string
}

function PasswordRecovery() {

    const messageForEmail = () => {
        return <div style={{'backgroundColor': 'lime', 'padding': '15px'}}>
            password recovery link:
            <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
        </div>
    }

    const dispatch = useDispatch();

    const statusRecovery = useSelector<RootReducerType, RecoveryStatusType>(state => state.passwordRecovery.status);
    const errorRecovery = useSelector<RootReducerType, string>(state => state.passwordRecovery.error);

    const {register, handleSubmit, formState: {errors}} = useForm<InputType>({mode: "onBlur"});
    const onSubmit: SubmitHandler<InputType> = data => {
        dispatch(passwordRecovery(data.email, messageForEmail))
    };

    if(statusRecovery === 'succeeded') {
        return <Navigate to={'/checkEmail'}/>
    }

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.title}>It-incubator</div>
                <div className={s.forgot}>Forgot your password?</div>
                <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className={s.description} htmlFor="email">Email</label>
                        <input type="text"
                               id="email"
                               placeholder={'enter your e-mail'}
                               {...register("email", {
                                   required: {value: true, message: 'Email is required'},
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                       message: 'Invalid email'
                                   },
                               })}/>
                        {errors.email && <div className={s.error}>{errors.email.message}</div>}
                        <label className={s.description} htmlFor="email">Enter your email address and we will send you further instructions </label>
                    </div>
                    <div>{statusRecovery === "loading" ? "loading" : ""}</div>
                    <button className={s.mainButton} type="submit">Send Instructions</button>
                    {errorRecovery}
                </form>
                <span className={s.remember}>Did you remember your password?</span>

                <a className={s.tryLogin}>Try logging in</a>

            </div>
        </>

    );
}

export default PasswordRecovery;