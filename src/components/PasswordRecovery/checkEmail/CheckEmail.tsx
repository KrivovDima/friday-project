import React from 'react';
import s from "./checkEmail.module.css";
import icon from '../../../img/envelope-open.svg'
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";

const CheckEmail = () => {

    const email = useSelector<RootReducerType, string>(state => state.passwordRecovery.email);

    return (
        <div className={s.wrapper}>
            <div className={s.title}>It-incubator</div>
            <img src={icon} alt="icon" className={s.icon}/>
            <div className={s.check}>Check Email</div>
            <span className={s.description}>We’ve sent an Email with instructions to {email}</span>
        </div>
    );
};

export default CheckEmail;