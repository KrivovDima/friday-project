import React from 'react';
import styles from "../PacklistRow/PackListRow.module.css";

export type PackRowDataType = {
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
        <div className={`row ${props.indexRow % 2 !== 0 && 'segregateRow'}`}>
            <div>{question}</div>
            <div>{answer}</div>
            <div>{updated}</div>
            <div>{grade}</div>
        </div>
    );
}

export default PackRow;