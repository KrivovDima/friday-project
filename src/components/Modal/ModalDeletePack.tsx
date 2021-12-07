import React from 'react';
import s from "./modalContent.module.css";
import close from './../../img/x-lg.svg'
import Button from "../../utils/Button";
import {fetchDeletePack} from '../../store/cardPacksReducer';
import {useDispatch} from 'react-redux';

type PropsType = {
    onClickCloseModal: (modalStatus: boolean)=>void
    title: string
    description: string
    packId: string
}

const ModalDeletePack = ({onClickCloseModal, title, description, packId}: PropsType) => {
    const dispatch = useDispatch()
    const onCancelClick = () => {
        onClickCloseModal(false)
    }
    const onDeleteClick = () => {
        dispatch(fetchDeletePack(packId))
        onClickCloseModal(false)
    }

    return (
        <div className={s.content} onClick={e => e.stopPropagation()}>
            <div className={s.head}>
                <p>{title}</p>
                <img src={close} alt="close" onClick={onCancelClick} className={s.close}/>
            </div>
            <div className={s.description}>
                <p>{description}</p>
            </div>
            <div className={s.buttonGroup}>
                <Button buttonName={'Cancel'} onButtonClick={onCancelClick} buttonStyle={s.buttonCancel} />
                <Button buttonName={'Delete'} onButtonClick={onDeleteClick} buttonStyle={s.buttonDelete} />
            </div>
        </div>
    );
};

export default ModalDeletePack;