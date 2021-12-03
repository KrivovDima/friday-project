import React from 'react';
import s from "./modalContent.module.css";
import close from "../../img/x-lg.svg";
import Button from "../../utils/Button";

type PropsType = {
    setModalActive: any
    title: string
    description?: string
}

const ModalAddNewPack = ({setModalActive, title, description}: PropsType) => {

    const onCancelClick = () => {
        setModalActive(false)
    }
    const onSaveClick = () => {

    }

    return (
        <div>
            <div className={s.content} onClick={e => e.stopPropagation()}>
                <div className={s.head}>
                    <p>{title}</p>
                    <img src={close} alt="close" onClick={onCancelClick} className={s.close}/>
                </div>
                <div className={s.inputNameNewPack}>
                    <input placeholder='Name pack'/>
                </div>
                <div className={s.buttonGroup}>
                    <Button buttonName={'Cancel'} onButtonClick={onCancelClick} buttonStyle={s.buttonCancel} />
                    <Button buttonName={'Save'} onButtonClick={onSaveClick} buttonStyle={s.buttonSave} />
                </div>
            </div>
        </div>
    );
};

export default ModalAddNewPack;