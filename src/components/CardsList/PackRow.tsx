import React from 'react';
import {formattingDate} from '../../utils/formattingDate';
import s from './CardsList.module.css'

export type PackRowDataType = {
    _id: string
    answer: string
    question: string
    updated: string
    grade: number
}

type PackRowPropsType = {
    data: PackRowDataType,
    indexRow: number
}

function PackRow(props: PackRowPropsType) {
    const {
        answer,
        question,
        updated,
        grade,
    } = props.data

    return (
        <div className={`${s.packRow} ${props.indexRow % 2 !== 0 ? s.segregateRow : ''}`}>
            <div className={s.tableCell}>{question}</div>
            <div className={s.tableCell}>{answer}</div>
            <div className={s.tableCell}>{formattingDate(updated)}</div>
            <div className={s.tableCell}>{Number(grade.toFixed(2))}</div>
        </div>
    );
}

export default PackRow;