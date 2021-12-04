import React from 'react';
import s from './PacksList.module.css';
import {formattingDate} from "../../utils/formattingDate";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDeletePack, fetchEditPack,
    setCurrentCardsPackID,
    setCurrentPackName
} from '../../store/cardPacksReducer';
import {NavLink} from 'react-router-dom';
import {AppRootStateType} from "../../store/store";

export type PackListRowDataType = {
    _id: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
    user_id: string
}

type PackListRowPropsType = {
    data: PackListRowDataType
    indexRow: number
    openLearn: () => void
}

function PackListRow(props: PackListRowPropsType) {
    const {
        _id,
        name,
        cardsCount,
        updated,
        user_name,
        user_id,
    } = props.data

    const dispatch = useDispatch()

    const idAuthorizedUser = useSelector<AppRootStateType, string>(state => state.login.userData._id);
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    const onClickDeleteHandle = () => {
        dispatch(fetchDeletePack(_id))
    }
    const onClickEditHandle = () => {
        dispatch(fetchEditPack({_id,name: 'KrivovUpd'}))
    }
    const onClickShowCardsHandle = () => {
        dispatch(setCurrentCardsPackID({currentCardsPackId: _id}))
        dispatch(setCurrentPackName({currentPackName: name}))
    }

    const onClickLearnHandle = () => {

    }


    return (
        <div
            className={`${s.packListRow} ${props.indexRow % 2 !== 0 ? s.segregateRow : ''}`}>
            <NavLink to={'/cardsList'} className={s.tableCell}
                     onClick={onClickShowCardsHandle}>{name}</NavLink>
            <div className={s.tableCell}>{cardsCount}</div>
            <div className={s.tableCell}>{formattingDate(updated)}</div>
            <div className={s.tableCell}>{user_name}</div>
            <div className={s.btns}>
                {
                    idAuthorizedUser === user_id &&
                    (<div className={s.privateBtns}>
                        <button disabled={appStatus === "loading"}
                                onClick={onClickDeleteHandle}
                                className={`${s.btn} ${s.btnDelete}`}>Delete
                        </button>
                        <button disabled={appStatus === "loading"}
                                onClick={onClickEditHandle}
                                className={s.btn}>Edit
                        </button>
                    </div>)
                }

                <button disabled={appStatus === "loading"}
                        onClick={onClickLearnHandle}
                        className={s.btn}>Learn
                </button>
            </div>
        </div>
    );
}

export default PackListRow;