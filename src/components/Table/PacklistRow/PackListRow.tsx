import React from 'react';
import styles from './PackListRow.module.css';
import {formattingDate} from "../../../utils/formattingDate";

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
}

function PackListRow(props: PackListRowPropsType) {
    const {
        name,
        cardsCount,
        updated,
        user_name,
    } = props.data

    return (
        <div className={`packListRow ${props.indexRow % 2 !== 0 ? 'segregateRow' : ''}`}>
            <div className='tableCell'>{name}</div>
            <div className='tableCell'>{cardsCount}</div>
            <div className='tableCell'>{formattingDate(updated)}</div>
            <div className='tableCell'>{user_name}</div>
            <div className={styles.btns}>
                <button className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                <button className={styles.btn}>Edit</button>
                <button className={styles.btn}>Learn</button>
            </div>
        </div>
    );
}

export default PackListRow;