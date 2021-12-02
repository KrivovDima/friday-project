import React from 'react';
import s from './PacksListRow.module.css';
import {formattingDate} from "../../utils/formattingDate";
import {useDispatch} from "react-redux";
import {
    requestCards,
    setCurrentCardsPackID,
    setCurrentPackName,
    setSearchPacksName
} from '../../store/cardPacksReducer';
import {NavLink} from 'react-router-dom';

export type PackListRowDataType = {
    _id: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
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
    } = props.data

    const dispatch = useDispatch()

    const onClickDeleteHandle = () => {

    }
    const onClickEditHandle = () => {

    }
    const onClickShowCardsHandle = () => {
        dispatch(setCurrentCardsPackID({currentCardsPackId: _id}))
        dispatch(setCurrentPackName({currentPackName: name}))
    }

    const onClickLearnHandle = () => {

    }


    return (
        <div className={`packListRow ${props.indexRow % 2 !== 0 ? s.segregateRow : ''}`}>
            <NavLink to={'/cardsList'} className='tableCell' onClick={onClickShowCardsHandle}>{name}</NavLink>
            <div className='tableCell'>{cardsCount}</div>
            <div className='tableCell'>{formattingDate(updated)}</div>
            <div className='tableCell'>{user_name}</div>
            <div className={s.btns}>
                <button onClick={onClickDeleteHandle} className={`${s.btn} ${s.btnDelete}`}>Delete</button>
                <button onClick={onClickEditHandle} className={s.btn}>Edit</button>
                <button onClick={onClickLearnHandle} className={s.btn}>Learn</button>
            </div>
        </div>
    );
}

export default PackListRow;