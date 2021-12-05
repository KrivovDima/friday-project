import React, {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import s from './CardsLearning.module.css'
import {AppRootStateType} from '../../store/store';
import {Navigate, useNavigate} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import {CardType, requestCards, resetCards} from '../../store/cardPacksReducer';

type Inputs = {
    /*didNotKnow: string,
    forgot: string
    aLotOfThought: string
    confused: string
    knewTheAnswer: string*/
    rate: number
};

const getCard = (cards: CardType[]) => {
    let i = -1
    let sum = 0
    if (cards.length > 0) {
        let sumForRandom = cards.reduce((acc, card) => acc + ((6 - card.grade) ** 2), 0)
        if (sumForRandom === 0) {
            return cards[Math.round(Math.random() * cards.length)]
        } else {
            let random = Math.random() * sumForRandom
            while (sum < random) {
                i++
                sum += ((6 - cards[i].grade) ** 2)
            }
        }
        return cards[i]
    }
}


export const CardsLearning = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)
    const currentCardsPackId = useSelector((state: AppRootStateType) => state.cardPacks.currentCardsPackId)
    const currentPack = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.cardPacks).find(c => c._id === currentCardsPackId)
    let totalCardsCount: number;
    if (currentPack) {
        totalCardsCount = currentPack.cardsCount
    }
    const currentPackName = useSelector((state: AppRootStateType) => state.cardPacks.currentPackName)
    const dataCardsList = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.cards);
    useEffect(() => {
        isLoggedIn && dispatch(requestCards({pageCount: totalCardsCount, cardsPack_id: currentCardsPackId}))
        return () => {
            dispatch(resetCards())
        }
    }, [])

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        // dispatch({}); update grade for currentCard  dispatch(fetchNewGradeCard(grade: data.rate, card_id: currentCard._id))
        setShowAnswer(false)
        let nextCard = getCard(dataCardsList)
        if (nextCard === currentCard) {
            nextCard = getCard(dataCardsList)
        }
        nextCard && setCurrentCard(nextCard)
    }


    useEffect(() => {
        const currentCard = getCard(dataCardsList)
        currentCard && setCurrentCard(currentCard)
    }, [dataCardsList])


    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    const initialCard = {
        answer: '',
        answerImg: null,
        answerVideo: null,
        cardsPack_id: '',
        comments: null,
        created: '',
        grade: 0,
        question: '',
        questionImg: null,
        questionVideo: null,
        // rating: number
        shots: 0,
        // type: string
        updated: '',
        user_id: '',
        // __v: string
        _id: ''
    }

    const [currentCard, setCurrentCard] = useState<CardType>(initialCard)


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div className={s.questionWrapper}>
            {appStatus === 'loading' && <Preloader/>}
            <div className={s.title}>Learn "{currentPackName}"</div>

            <div className={s.description}><b>Question: </b> {currentCard.question && `"${currentCard.question}"` }
            </div>

            {showAnswer &&
            <div className={s.description}><b>Answer: </b>"{currentCard.answer}"</div>}


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
                            type="radio" value="5" defaultChecked={false}
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
                        onClick={() => navigate('/packsList')}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={appStatus === 'loading'}
                        type={'submit'}
                        className={s.mainButton}
                        // onClick={()=>{setCurrentCard(getCard(dataCardsList))}}
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
                    onClick={() => navigate('/packsList')}
                >
                    Cancel
                </button>

                <button
                    disabled={appStatus === 'loading'}
                    type={'button'}
                    className={s.mainButton}
                    onClick={() => setShowAnswer(true)}
                >
                    Show answer
                </button>

            </div>
            }
        </div>
    )
}