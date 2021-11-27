import React, {useEffect, useState} from 'react'
import s from './SearchInput.module.css';
import {useDispatch} from 'react-redux';
import {setSearchPacksName} from '../../store/cardPacksReducer';
import useDebounce from '../../utils/useDebounce';


type SearchInputPropsType = {
    disabled: boolean
    setSearch: typeof setSearchPacksName
}


export const SearchInput = (props: SearchInputPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const searchValue = useDebounce(value, 1500)


    useEffect(()=>{
        dispatch(props.setSearch({packName: searchValue}))
    })


    return (
        <div className={s.inputWrapper}>
            <input
                disabled={props.disabled}
                className={s.input}
                placeholder={'Search...'}
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value)
                }}
            />
        </div>
    )
}

