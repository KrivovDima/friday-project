import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import s from './CardsLearning.module.css'
import {loginTC} from '../../store/loginReducer';
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

type DeleteModalPropsType = {
    _id: string
    packName: string
    showModal: (show: boolean) => void
};

export const CardsLearning = (props: DeleteModalPropsType) => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)



    return (
        <div>
            <div className={s.wrapper}>
                {appStatus === 'loading' && <Preloader/>}
                <div className={s.titleWrapper}>
                    <div className={s.title}>Delete Pack</div>
                    <div className={s.close} onClick={()=>{props.showModal(false)}}>x </div>
                </div>
                <div className={s.description}>
                    Do you really want to delete <b>Pack Name</b> <b>Name Pack</b> ?
                    All cards will be excluded from this course.
                </div>

                <div className={s.buttonsWrapper}>
                    <button
                        disabled={appStatus === 'loading'}
                        className={s.cancelButton}
                        onClick={()=>{props.showModal(false)}}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={appStatus === '' +
                        'loading'}
                        className={s.deleteButton}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className={s.opaqueBack} onClick={()=>{props.showModal(false)}}></div>
        </div>
    )
}