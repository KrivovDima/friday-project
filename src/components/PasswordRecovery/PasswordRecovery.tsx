import React from 'react';
import s from './passwordRecovery.module.css'
import {SubmitHandler, useForm} from "react-hook-form";

type InputType = {
    email: string
}

function PasswordRecovery() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm<InputType>({mode: "onBlur"});
    const onSubmit: SubmitHandler<InputType> = data => console.log(data);

    return (
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
                <button className={s.mainButton} type="submit">Send Instructions</button>
            </form>
            <span className={s.remember}>Did you remember your password?</span>

            <a className={s.tryLogin}>Try logging in</a>

        </div>
    );
}

export default PasswordRecovery;