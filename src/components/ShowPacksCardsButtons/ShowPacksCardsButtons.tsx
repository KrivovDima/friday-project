import React from 'react'
import s from './ShowPacksCardsButtons.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {AppRootStateType} from '../../store/store';


type ShowPacksCardsButtonsPropsType = {
    disabled: boolean
}

export const ShowPacksCardsButtons = (props: ShowPacksCardsButtonsPropsType) => {

    const dispatch = useDispatch()

    const userId = useSelector((state: AppRootStateType) => state.login.userData._id)

    const params = useParams()


    return (
        <div>
            <div className={props.disabled ? `${s.disabledButton} ${s.buttonsWrapper}` : s.buttonsWrapper}>
                <div

                    onClick={() => {
                    }} // запрос на сервер с user_id, затем setpacks
                    className={params.user_id ? `${s.button} ${s.selectedButton}` : `${s.button} ${s.disabledButton}`}>My
                </div>
                <div className={s.border}></div>
                <div
                    onClick={() => {
                    }} // запрос на сервер за всеми колодами и затем setpacks
                    className={!params.user_id ? `${s.button} ${s.selectedButton}` : `${s.button} ${s.disabledButton}`}>All
                </div>

            </div>

        </div>
    )
}

