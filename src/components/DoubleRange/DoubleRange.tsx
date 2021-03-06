import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './DoubleRange.module.css';
import {useDispatch} from 'react-redux';
import {setMinMaxCardsCount} from '../../store/cardPacksReducer';
import useDebounce from '../../utils/useDebounce';

type DoubleRangePropsType = {
    setMinMaxAction: typeof setMinMaxCardsCount
    min: number
    max: number
    disabled: boolean
}

export const DoubleRange = (props: DoubleRangePropsType) => {

    const dispatch = useDispatch()

    const [values, setValues] = useState<number[]>([props.min, props.max]);

    const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < values[1]) {
            setValues([+e.currentTarget.value, values[1]]);
        }
    }
    const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value > values[0]) {
            setValues([values[0], +e.currentTarget.value]);
        }
    }

    const searchValues = useDebounce(values, 1500)

    useEffect(()=>{
        dispatch(props.setMinMaxAction({min: searchValues[0], max: searchValues[1]}))
    })


   /* const onMouseUpHandler = () => {
        dispatch(props.setMinMaxAction({min: values[0], max: values[1]}))
        // dispatch(setMinMaxCardsCount({minCardsCount: 20, maxCardsCount: 60}))
    }*/

    return (
        <div>
            <div className={s.doubleRangeWrapper}>
                <input
                    type={'range'}
                    onChange={onChangeMin}
                    disabled={props.disabled}
                    value={values[0]}
                    // onClick={onMouseUpHandler}
                    min={props.min}
                    max={props.max}

                />
                <div className={s.fakeTrack}></div>
                <input
                    type={'range'}
                    onChange={onChangeMax}
                    disabled={props.disabled}
                    value={values[1]}
                    // onClick={onMouseUpHandler}
                    min={props.min}
                    max={props.max}
                />
            </div>
            <div className={s.values}>
                <div className={s.value}>{values[0]}</div>
                <div className={s.value}>{values[1]}</div>
            </div>
        </div>
    )
}

