import React, {useState} from 'react'
import s from './SearchInput.module.css';
import {useDispatch} from 'react-redux';
import {setSearchPacksName} from '../../store/cardPacksReducer';


type SearchInputPropsType = {
    disabled: boolean
    setSearch: typeof setSearchPacksName
}


export const SearchInput = (props: SearchInputPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const searchRequestHandler = () => {
        dispatch(props.setSearch({packName: value}))
    }

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
                onBlur={searchRequestHandler}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        searchRequestHandler()
                    }
                }}
            />
        </div>
    )
}

