import React, {useState} from 'react'
import s from './SearchInput.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {QueryRequestType} from "../../api/packs-api";
import {Dispatch} from "redux";


type SearchInputPropsType = {
    disabled: boolean
    setSearch: (data: QueryRequestType) => (dispatch: Dispatch) => void
}


export const SearchInput = (props: SearchInputPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const searchRequestHandler = () => {
        console.log(value)
        dispatch(props.setSearch({packName: value}))
    }

    return (
        <div>
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
                    onKeyPress={(e)=>{
                       if (e.key === 'Enter') {
                           searchRequestHandler()
                       }
                    }}
                />

            </div>

        </div>
    )
}

