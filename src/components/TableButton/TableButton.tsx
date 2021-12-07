import React from 'react';

import styles from './TableButton.module.css';

type TableButtonPropsType = {
    disabled: boolean
    onClick: () => void
    text: string
    role: 'edit' | 'learn' | 'delete'
}

export const TableButton: React.FC<TableButtonPropsType> = (props) => {
    const {disabled, onClick, text, role} = props

    return (
        <button disabled={disabled}
                onClick={onClick}
                className={role === 'delete' ? `${styles.btn} ${styles.btnDelete}` : styles.btn}>
            {text}
        </button>
    );
};

