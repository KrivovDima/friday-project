import React from 'react';
import s from '../PasswordRecovery/passwordRecovery.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {RecoveryStatusType} from '../../store/passwordRecoveryReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {inputNewPassword} from '../../store/inputNewPasswordReducer';
import {Navigate, useParams} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

type InputType = {
    password: string
}

function InputNewPassword() {

    const {token} = useParams<string>()

    const dispatch = useDispatch();

    const appStatus = useSelector<AppRootStateType, RecoveryStatusType>(state => state.app.status);
    const error = useSelector<AppRootStateType, string>(state => state.app.error);

    const {register, handleSubmit, formState: {errors}} = useForm<InputType>({mode: 'onBlur'});
    const onSubmit: SubmitHandler<InputType> = data => {
        dispatch(inputNewPassword(data.password, token))
    };

    if (appStatus === 'succeeded') {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.wrapper}>
            {appStatus === 'loading' && <Preloader/>}
            <div className={s.title}>It-incubator</div>
            <div className={s.forgot}>Create new password</div>
            <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder="Password"
                           disabled={appStatus === 'loading'}
                           type="password"
                           {...register('password', {
                               required: {value: true, message: 'Password is required'},
                               minLength: {value: 4, message: 'Password must be more than 7 characters'},
                           })}/>
                    {errors.password && <div className={s.error}>{errors.password.message}</div>}
                    <label className={s.description} htmlFor="email">Create new password and we will send you further
                        instructions to email</label>
                </div>
                <button className={s.mainButton}
                        disabled={appStatus === 'loading'}
                        type="submit">Create new password
                </button>
                {error && error}
            </form>
        </div>
    );
}

export default InputNewPassword;