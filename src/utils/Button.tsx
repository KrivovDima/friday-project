import React from 'react';
import s from './button.module.css'

type PropsType = {
    buttonName: string
    onButtonClick: () => void
    buttonStyle: any
}

const Button = ({buttonName, onButtonClick, buttonStyle}: PropsType) => {

    return (
        <div>
            <button onClick={onButtonClick} className={`${s.button} + ${buttonStyle}`}>
                {buttonName}
            </button>
        </div>
    );
};

export default Button;