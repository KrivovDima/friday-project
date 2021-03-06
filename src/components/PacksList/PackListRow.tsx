import React, {useState} from 'react';
import s from './PacksList.module.css';
import {formattingDate} from "../../utils/formattingDate";
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchEditPack,
    setCurrentCardsPackID,
    setCurrentPackName} from '../../store/cardPacksReducer';
import ModalWindow from "../Modal/ModalWindow";
import ModalDeletePack from "../Modal/ModalDeletePack";
import { AppRootStateType } from '../../store/store';
import { TableButton } from '../TableButton/TableButton';
import {Navigate, NavLink, useNavigate } from 'react-router-dom';

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

    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)

    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)
    const navigate = useNavigate()


    const idAuthorizedUser = useSelector<AppRootStateType, string>(state => state.login.userData._id);
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    const onClickDeleteHandle = () => {
        setModalActive(true)
    }
    const onClickCloseModal = (modalStatus: boolean) => {
        setModalActive(false)
    }
    const onClickEditHandle = () => {
        dispatch(fetchEditPack({_id, name: 'KrivovUpd'}))
    }
    const onClickShowCardsHandle = () => {
        dispatch(setCurrentCardsPackID({currentCardsPackId: _id}))
        dispatch(setCurrentPackName({currentPackName: name}))
    }

    const onClickLearnHandle = () => {
        dispatch(setCurrentCardsPackID({currentCardsPackId: _id}))
        dispatch(setCurrentPackName({currentPackName: name}))
        navigate('/cardsLearning')
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <ModalWindow modalActive={modalActive} setModalActive={setModalActive}>
                <ModalDeletePack onClickCloseModal={onClickCloseModal}
                                 title={'Delete Pack'}
                                 packId={_id}
                                 description={`Do you really want to remove ${name}? 
                              All cards will be excluded from this course.`}
                />
            </ModalWindow>
            <div className={`${s.packListRow} ${props.indexRow % 2 !== 0 ? s.segregateRow : ''}`}>
                <NavLink to={'/cardsList'} className={s.tableCell}
                         onClick={onClickShowCardsHandle}>{name}</NavLink>
                <div className={s.tableCell}>{cardsCount}</div>
                <div className={s.tableCell}>{formattingDate(updated)}</div>
                <div className={s.tableCell}>{user_name}</div>
                <div className={s.btns}>
                    {
                        idAuthorizedUser === user_id &&
                        (<div className={s.privateBtns}>
                            <TableButton disabled={appStatus === 'loading'}
                                         onClick={onClickDeleteHandle}
                                         text={'Delete'}
                                         role={'delete'}/>
                            <TableButton disabled={appStatus === 'loading'}
                                         onClick={onClickEditHandle}
                                         text={'Edit'}
                                         role={'edit'}/>
                        </div>)
                    }
                    <TableButton disabled={appStatus === 'loading'}
                                 onClick={onClickLearnHandle}
                                 text={'Learn'}
                                 role={'learn'}/>
                </div>
            </div>
        </>

    );
}

export default PackListRow;