import React, {useState} from 'react'
import s from './SearchInput.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';


type SearchInputPropsType = {
    disabled: boolean
}


export const SearchInput = (props: SearchInputPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const searchRequestHandler = () => {
        console.log(value)
        // dispatch('thunk with value')
        // setValue('')
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

