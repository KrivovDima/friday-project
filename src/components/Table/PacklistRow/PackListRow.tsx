import React from 'react';
import styles from './PackListRow.module.css';

export type PackListRowDataType = {
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
        <div className={`row ${props.indexRow % 2 !== 0 && 'segregateRow'}`}>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>{user_name}</div>
            <div className={styles.btns}>
                <button className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                <button className={`${styles.btn}`}>Edit</button>
                <button className={`${styles.btn}`}>Learn</button>
            </div>
        </div>
    );
}

export default PackListRow;