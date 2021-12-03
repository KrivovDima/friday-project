import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import s from './CardsLearning.module.css'
import {loginTC} from '../../store/loginReducer';
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

type Inputs = {
    /*didNotKnow: string,
    forgot: string
    aLotOfThought: string
    confused: string
    knewTheAnswer: string*/
    rate:number
};

export const CardsLearning = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)
    const currentPackName = useSelector((state: AppRootStateType) => state.cardPacks.currentPackName)
    const dataCardsList = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.cards);

    const [showAnswer, setShowAnswer] = useState<boolean>(true)

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        // dispatch({});
    }

    return (
        <div className={s.questionWrapper}>
            {appStatus === 'loading' && <Preloader/>}
            <div className={s.title}>Learn "{currentPackName}"</div>

            <div className={s.description}><b>Question: </b>"Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. "
            </div>

            {showAnswer &&
            <div className={s.description}><b>Answer: </b>"Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. "</div>}


            {showAnswer &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.rateWrapper}>

                    <label className={s.rate}>
                        <input
                            disabled={appStatus === 'loading'}
                            type="radio" value={1} defaultChecked={false}
                            {...register('rate', {required: true})}
                        />
                        Did not know
                    </label>
                    <label className={s.rate}>
                        <input
                            disabled={appStatus === 'loading'}
                            type="radio" value={2} defaultChecked={false}
                            {...register('rate', {required: true})}
                        />
                        Forgot
                    </label>
                    <label className={s.rate}>
                        <input
                            disabled={appStatus === 'loading'}
                            type="radio" value={4} defaultChecked={false}
                            {...register('rate', {required: true})}
                        />
                        A lot of thought
                    </label>
                    <label className={s.rate}>
                        <input
                            disabled={appStatus === 'loading'}
                            type="radio" value={3} defaultChecked={false}
                            {...register('rate', {required: true})}
                        />
                        Confused
                    </label>
                    <label className={s.rate}>
                        <input
                            disabled={appStatus === 'loading'}
                            type="radio" value='5' defaultChecked={false}
                            {...register('rate', {required: true})}
                        />
                        Knew the answer
                    </label>
                </div>
                <div className={s.btnWrapper}>
                    <button
                        disabled={appStatus === 'loading'}
                        type={'button'}
                        className={s.cancelButton}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={appStatus === 'loading'}
                        type={'submit'}
                        className={s.mainButton}
                    >
                        Next
                    </button>
                </div>
            </form>
            }
            {!showAnswer &&
            <div className={s.btnWrapper}>
                <button
                    disabled={appStatus === 'loading'}
                    type={'button'}
                    className={s.cancelButton}
                >
                    Cancel
                </button>

                <button
                    disabled={appStatus === 'loading'}
                    type={'button'}
                    className={s.mainButton}
                >
                    Show answer
                </button>

            </div>
            }
        </div>
    )
}