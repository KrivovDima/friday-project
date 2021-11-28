import React from 'react'
import s from './ShowPacksCardsButtons.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {setUserId} from '../../store/cardPacksReducer';


type ShowPacksCardsButtonsPropsType = {
    disabled: boolean
}

export const ShowPacksCardsButtons = (props: ShowPacksCardsButtonsPropsType) => {

    const dispatch = useDispatch()

    const userIdForRequest = useSelector((state: AppRootStateType) => state.cardPacks.user_id)
    const userId = useSelector((state: AppRootStateType) => state.login.userData._id)



    return (
        <div>
            <div className={props.disabled ? `${s.disabledButton} ${s.buttonsWrapper}` : s.buttonsWrapper}>
                <div

                    onClick={() => {dispatch(setUserId({user_id: userId}))}}
                    className={!userIdForRequest ? `${s.button} ${s.selectedButton}` : `${s.button} ${s.disabledButton}`}>My
                </div>
                <div className={s.border}></div>
                <div
                    onClick={() => {dispatch(setUserId({user_id: ''}))}}
                    className={!!userIdForRequest ? `${s.button} ${s.selectedButton}` : `${s.button} ${s.disabledButton}`}>All
                </div>

            </div>

        </div>
    )
}

