import React from 'react';
import styles from './PackListRow.module.css';
import {formattingDate} from "../../../utils/formattingDate";
import {useDispatch} from "react-redux";
import {deleteCards, requestCardPack, requestCards} from '../../../store/cardPacksReducer';

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
        dispatch(deleteCards(_id))
        dispatch(requestCardPack({}))
        props.openLearn()
    }
    const onClickEditHandle = () => {

    }
    const onClickLearnHandle = () => {
        dispatch(requestCards({cardsPack_id: _id}))
        props.openLearn()
    }

    return (
        <div className={`packListRow ${props.indexRow % 2 !== 0 ? 'segregateRow' : ''}`}>
            <div className='tableCell'>{name}</div>
            <div className='tableCell'>{cardsCount}</div>
            <div className='tableCell'>{formattingDate(updated)}</div>
            <div className='tableCell'>{user_name}</div>
            <div className={styles.btns}>
                <button onClick={onClickDeleteHandle} className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                <button onClick={onClickEditHandle} className={styles.btn}>Edit</button>
                <button onClick={onClickLearnHandle} className={styles.btn}>Learn</button>
            </div>
        </div>
    );
}

export default PackListRow;