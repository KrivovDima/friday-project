import React from 'react';
import s from "../PasswordRecovery/passwordRecovery.module.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {RecoveryStatusType} from "../../store/passwordRecoveryReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {inputNewPassword} from "../../store/inputNewPasswordReducer";
import {Navigate, useParams} from "react-router-dom";
import Login from "../Login/Login";

type InputType = {
    password: string
}

function InputNewPassword() {

    const {token} = useParams<string>()

    const dispatch = useDispatch();

    const statusNewPassword = useSelector<RootReducerType, RecoveryStatusType>(state => state.inputNewPassword.status);
    const error = useSelector<RootReducerType, string>(state => state.inputNewPassword.error);

    const {register, handleSubmit, watch, formState: {errors}} = useForm<InputType>({mode: "onBlur"});
    const onSubmit: SubmitHandler<InputType> = data => {
        dispatch(inputNewPassword(data.password, token))
    };

    if(statusNewPassword === 'succeeded') {
        return <Navigate to='/login'/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.title}>It-incubator</div>
            <div className={s.forgot}>Create new password</div>
            <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder='Password'
                           type="password"
                           {...register("password", {
                               required: {value: true, message: 'Password is required'},
                               minLength: {value: 4, message: 'Password must be more than 7 characters'},
                           })}/>
                    {errors.password && <div className={s.error}>{errors.password.message}</div>}
                    <label className={s.description} htmlFor="email">Create new password and we will send you further
                        instructions to email</label>
                </div>
                <div>{statusNewPassword === "loading" ? "loading" : ""}</div>
                <button className={s.mainButton} type="submit">Create new password</button>
                {error}
            </form>
        </div>
    );
}

export default InputNewPassword;