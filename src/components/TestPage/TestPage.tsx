import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
    requestCardPack,
    setMinMaxCardsCount,
    setPacksPage,
    setPacksPageCount,
    setSearchPacksName
} from '../../store/cardPacksReducer';
import {
    PackType,
} from '../../store/cardPacksReducer';
import {Paginator} from '../Paginator/Paginator';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {SearchInput} from '../SearchInput/SearchInput';
import {CardsLearning} from '../CardsLearning/CardsLearning';

function TestPage() {

    const newPack: PackType = {
        _id: '213124234',
        user_id: 'fewfewfwefwefwe',
        user_name: 'DmitriyKoms',
        private: false,
        name: 'New pack for test',
        // path: string,
        // grade: number,
        // shots: number,
        cardsCount: 222,
        // type: string,
        // rating: number,
        created: 'dfwfw',
        updated: 'efqdqwd',
        more_id: 'f1fd131',
        // __v: number,
    }

    const dispatch = useDispatch()

    const minPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.minCardsCount)
    const maxPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.maxCardsCount)

    const currentPage = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.page)
    const currentPageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.pageCount)
    const cardPacksTotalCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.cardPacksTotalCount)

   // const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    const [showModal, setShowModal] = useState<boolean>(true)

    const appStatus = 'idle'

    useEffect(() => {
         dispatch(requestCardPack())
    }, [])


    const addPacks = () => {
        // dispatch(addCardPack(newPack))
    }

    return (
        <div /*className={s.testPageContainer}*/>
            TestPage
            <hr/>
            <hr/>
            <DoubleRange
                min={minPacksCount}
                max={maxPacksCount}
                setMinMaxAction={setMinMaxCardsCount}
                disabled={false}
            />

           {/* disabled={appStatus === 'loading'}*/}

            <hr/>
            <Paginator
                // page={currentPage}
                page={currentPage}
                // pageCount={currentPageCount}
                pageCount={currentPageCount}
                // totalCount={cardPacksTotalCount}
                totalCount={200}
                setPageAction={setPacksPage}
                setPageCountAction={setPacksPageCount}
                disabled={false}
            />
            <hr/>
            <ShowPacksCardsButtons
                disabled={false}/>
            <hr/>
            <SearchInput
                setSearch={setSearchPacksName}
                disabled={false}/>

            <button onClick={addPacks}>
                Add packs
            </button>


            {showModal && <CardsLearning _id={'some_id_u283y8'} packName={'some_pack'} showModal={setShowModal} />}

        </div>
    );
}

export default TestPage;