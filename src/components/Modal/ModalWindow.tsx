import React from 'react';
import s from './modalWindow.module.css'

type PropsType = {
    children: JSX.Element
    modalActive: boolean
    setModalActive: any
}

const ModalWindow = ({children, setModalActive, modalActive} : PropsType) => {
    return (
        <div className={modalActive ? `${s.container} + ${s.active}` : s.container} onClick={() => setModalActive(false)}>
            {children}
        </div>
    );
};

export default ModalWindow;