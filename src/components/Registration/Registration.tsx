import React from 'react';
import styles from './Registration.module.css';
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {registration, RegistrationStatusType} from "../../store/registrationReducer";

type InputsType = {
    email: string
    password: string
    confirmPassword: string
}

function Registration() {

    const dispatch = useDispatch();

    const statusRegistration = useSelector<RootReducerType, RegistrationStatusType>(state => state.registration.status);
    const errorRegistration = useSelector<RootReducerType, string>(state => state.registration.error);

    const {register, handleSubmit, watch, formState: {errors}} = useForm<InputsType>({mode: "onSubmit"});
    const passwordValue = watch("password");
    const onSubmit: SubmitHandler<InputsType> = data => dispatch(registration(data.email, data.password));

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h2 className={styles.title}>It-incubator</h2>
                <h3 className={styles.subTitle}>Sign Up</h3>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputWrapper}>
                        <input placeholder='Email'
                               className={styles.input}
                               type="text"
                               {...register("email", {
                                   required: {value: true, message: 'Email is required'},
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                       message: 'Invalid email'
                                   },
                               })}/>
                        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <input placeholder='Password'
                               className={styles.input}
                               type="password"
                               {...register("password", {
                                   required: {value: true, message: 'Password is required'},
                                   minLength: {value: 4, message: 'Password must be more than 7 characters'},
                               })}/>
                        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <input placeholder='Confirm password'
                               className={styles.input}
                               type="password"
                               {...register("confirmPassword", {
                                   required: {value: true, message: 'Confirm password is required'},
                                   validate: value => value === passwordValue || 'Password mismatch',
                               })}/>
                        {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword.message}</div>}
                    </div>
                    <div className={styles.btns}>
                        <button className={styles.btn}>Cancel</button>
                        <div>{statusRegistration === "loading" ? "loading" : ""}</div>
                        <button disabled={statusRegistration === "loading"} type="submit">Register</button>
                    </div>
                    {errorRegistration}
                </form>
            </div>
        </div>
    );
}

export default Registration;