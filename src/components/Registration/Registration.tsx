import React from 'react';
import styles from './Registration.module.css';
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {changeStatusRegistration, registration, RegistrationStatusType} from "../../store/registrationReducer";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../store/store";
import Preloader from "../Preloader/Preloader";

type InputsType = {
    email: string
    password: string
    confirmPassword: string
}

function Registration() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const statusRegistration = useSelector<AppRootStateType, RegistrationStatusType>(state => state.registration.status);
    const errorRegistration = useSelector<AppRootStateType, string>(state => state.registration.error);

    const {register, handleSubmit, watch, formState: {errors}} = useForm<InputsType>({mode: "onSubmit"});
    const passwordValue = watch("password");
    const onSubmit: SubmitHandler<InputsType> = data => dispatch(registration(data.email, data.password));

    if (statusRegistration === "succeeded") {
        dispatch(changeStatusRegistration("idle"));
        navigate('/login');
    }

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
                        {errors.email && <div className={styles.errorInput}>{errors.email.message}</div>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <input placeholder='Password'
                               className={styles.input}
                               type="password"
                               {...register("password", {
                                   required: {value: true, message: 'Password is required'},
                                   minLength: {value: 8, message: 'Password must be more than 7 characters'},
                               })}/>
                        {errors.password && <div className={styles.errorInput}>{errors.password.message}</div>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <input placeholder='Confirm password'
                               className={styles.input}
                               type="password"
                               {...register("confirmPassword", {
                                   required: {value: true, message: 'Confirm password is required'},
                                   validate: value => value === passwordValue || 'Password mismatch',
                               })}/>
                        {errors.confirmPassword && <div className={styles.errorInput}>{errors.confirmPassword.message}</div>}
                    </div>
                    <div className={styles.preloaderWrapper}>{statusRegistration === "loading" && <Preloader/>}</div>
                    <div className={styles.btns}>
                        <button onClick={() => {navigate('/')}}
                                className={`${styles.btn} ${styles.btnCancel}`}>Cancel
                        </button>
                        <button className={styles.btn}
                                disabled={statusRegistration === "loading"}
                                type="submit">Register</button>
                    </div>
                    <div className={styles.errorBox}>{errorRegistration}</div>
                </form>
            </div>
        </div>
    );
}

export default Registration;