import React from 'react';
import {formattingDate} from '../../utils/formattingDate';
import s from './PackRow.module.css'

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
        <div className={`packRow ${props.indexRow % 2 !== 0 ? s.segregateRow : ''}`}>
            <div className="tableCell">{question}</div>
            <div className="tableCell">{answer}</div>
            <div className="tableCell">{formattingDate(updated)}</div>
            <div className="tableCell">{Number(grade.toFixed(2))}</div>
        </div>
    );
}

export default PackRow;