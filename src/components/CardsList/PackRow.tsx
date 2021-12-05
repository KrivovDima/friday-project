import React from 'react';
import {formattingDate} from '../../utils/formattingDate';
import s from './CardsList.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TableButton} from "../TableButton/TableButton";

export type PackRowDataType = {
    _id: string
    answer: string
    question: string
    updated: string
    grade: number
    user_id: string
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
        user_id,
    } = props.data

    const idAuthorizedUser = useSelector<AppRootStateType, string>(state => state.login.userData._id);
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    const onClickDeleteHandle = () => {
    }
    const onClickEditHandle = () => {
    }

    return (
        <div className={`${s.packRow} ${props.indexRow % 2 !== 0 ? s.segregateRow : ''}`}>
            <div className={s.tableCell}>{question}</div>
            <div className={s.tableCell}>{answer}</div>
            <div className={s.tableCell}>{formattingDate(updated)}</div>
            <div className={s.tableCell}>{Number(grade.toFixed(2))}</div>
            <div className={s.btns}>
                {
                    idAuthorizedUser ===  user_id && (
                        <div className={s.btnsContainer}>
                            <TableButton disabled={appStatus === 'loading'}
                                         onClick={onClickDeleteHandle}
                                         text={'Delete'}
                                         role={'delete'}/>
                            <TableButton disabled={appStatus === 'loading'}
                                         onClick={onClickEditHandle}
                                         text={'Edit'}
                                         role={'edit'}/>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default PackRow;