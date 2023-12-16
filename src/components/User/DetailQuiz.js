import { useEffect, useState } from "react";
import {useParams, useLocation} from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async() => {
        let res = await getDataQuiz(quizId);
        if(res && res.EC === 0){
            let raw = res.DT;
            let data = _.chain(raw)
            .groupBy("id")
            .map((value, key) => {
                let answers = [];
                let questionDescription, image = null;
                value.forEach((item, index) => {
                    if(index === 0){
                        questionDescription = item.description;
                        image = item.image
                    }
                    item.answers.isSelected = false;
                    answers.push(item.answers);
                })
                return {questionId: key, answers, questionDescription, image};
            })
            .value()
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0){
            return
        }
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1){
            setIndex(index + 1)
        }
    }

    const handleFinishQuiz = async() => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];
        if(dataQuiz && dataQuiz.length > 0){
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach(answer => {
                    if(answer.isSelected === true){
                        userAnswerId.push(answer.id);
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // submit api
            let res = await postSubmitQuiz(payload);
            if(res && res.EC === 0){
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            }else{
                alert('something wrongs...')
            }
        }
    }

    const handleCheckbox = (answersId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if(question && question.answers){
            let b = question.answers.map(item =>{
                if(+item.id === +answersId){
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if(index > -1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }

    return(
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle} <hr/>
                </div>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                    <Question handleCheckbox={handleCheckbox} index={index} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}/>
                </div>
                <div className="footer">
                    <button className={index === 0 ? 'btn btn-secondary' : 'btn btn-primary'} onClick={() => handlePrev()}>Prev</button>
                    <button className={index === dataQuiz.length - 1 ? 'btn btn-secondary' : 'btn btn-primary'} onClick={() => handleNext()}>Next</button>
                    <button className='btn btn-warning' onClick={() => handleFinishQuiz()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult  show={isShowModalResult} setShow={setIsShowModalResult} dataModalResult={dataModalResult}/>
        </div>
    )
}

export default DetailQuiz;