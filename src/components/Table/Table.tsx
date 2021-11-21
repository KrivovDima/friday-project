import React from 'react';
import './Table.css';
import TableHeader from "./TableHeader/TableHeader";
import PackListRow, {PackListRowDataType} from "./PacklistRow/PackListRow";
import PackRow, {PackRowDataType} from "./PackRow/PackRow";

export type TableModeType = 'packsList' | 'pack'

function Table() {
    const dataPacksList: any = [
        {
            "_id": "619960925665e51adcfdbcac",
            "user_id": "6197ce125fac6b0b9ccbe334",
            "user_name": "qwe123@mail.ru",
            "private": false,
            "name": "131",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 0,
            "type": "pack",
            "rating": 0,
            "created": "2021-11-20T20:54:42.789Z",
            "updated": "2021-11-20T20:54:42.789Z",
            "more_id": "6197ce125fac6b0b9ccbe334",
            "__v": 0
        },
        {
            "_id": "619954be5665e51adcfdbc30",
            "user_id": "6197ce125fac6b0b9ccbe334",
            "user_name": "qwe123@mail.ru",
            "private": false,
            "name": "241rwqd",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 0,
            "type": "pack",
            "rating": 0,
            "created": "2021-11-20T20:04:14.305Z",
            "updated": "2021-11-20T20:04:14.305Z",
            "more_id": "6197ce125fac6b0b9ccbe334",
            "__v": 0
        },
        {
            "_id": "619932515665e51adcfdb9c2",
            "user_id": "5eecf82a3ed8f700042f1186",
            "user_name": "Why did you do this ?",
            "private": false,
            "name": "no Name",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 0,
            "type": "pack",
            "rating": 0,
            "created": "2021-11-20T17:37:21.547Z",
            "updated": "2021-11-20T17:37:21.547Z",
            "more_id": "5eecf82a3ed8f700042f1186",
            "__v": 0
        },
        {
            "_id": "6199324f5665e51adcfdb9b6",
            "user_id": "5eecf82a3ed8f700042f1186",
            "user_name": "Why did you do this ?",
            "private": false,
            "name": "no Name",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 0,
            "type": "pack",
            "rating": 0,
            "created": "2021-11-20T17:37:19.845Z",
            "updated": "2021-11-20T17:37:19.845Z",
            "more_id": "5eecf82a3ed8f700042f1186",
            "__v": 0
        }
    ];
    const dataPack: any = [{
        answer: "no answer1",
        question: "no question1",
        updated: "2020-05-13T11:05:44.867Z",
        grade: 4.987525071790364,
    }, {
        answer: "no answer2",
        question: "no question2",
        updated: "2020-05-13T11:05:44.867Z",
        grade: 4.987525071790364,
    }, {
        answer: "no answer3",
        question: "no question2",
        updated: "2020-05-13T11:05:44.867Z",
        grade: 4.987525071790364,
    }];
    const tableMode: TableModeType = 'pack';

    return (
        (dataPacksList.length || dataPack.length)
            ? (<div className='table'>
                <TableHeader tableMode={tableMode}/>
                {
                    //@ts-ignore
                    tableMode === 'packsList'
                        ? dataPacksList.map(
                            ({name, cardsCount, updated, user_name}: PackListRowDataType, index: number) =>
                                (<PackListRow key={index} data={{name, cardsCount, updated, user_name}} indexRow={index}/>)
                        )
                        : dataPack.map(
                            ({answer, question, grade, updated}: PackRowDataType, index: number) =>
                                (<PackRow key={index} data={{answer, question, grade, updated}} indexRow={index}/>)
                        )
                }
            </div>)
            : <div>Loading...</div>
    );
}

export default Table;