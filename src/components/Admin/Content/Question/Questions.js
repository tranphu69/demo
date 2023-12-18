import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill, BsPatchMinusFill} from "react-icons/bs";
import {AiOutlineMinusCircle, AiFillPlusCircle} from 'react-icons/ai';
import {RiImageAddFill} from "react-icons/ri";
import {v4 as uuidv4, validate} from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/apiService';
import { toast} from 'react-toastify';

const Questions = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const initQuestions = [
        {
            id: uuidv4(),
            description:"",
            imageFile: "",
            imageName: "",
            answers:[
                {
                    id: uuidv4(),
                    description:"",
                    isCorrect: false
                }
            ]
        }
    ];
    const [questions, setQuestions] = useState(initQuestions);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title:'',
        url:''
    })
    const [listQuiz, setListQuiz] = useState();


    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const handleAllRemoveQuestion = (type, id) => {
        if(type === 'ADD'){
            const newQuestion = {
                id: uuidv4(),
                description:"",
                imageFile: "",
                imageName: "",
                answers:[
                    {
                        id: uuidv4(),
                        description:"",
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if(type === 'REMOVE'){
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAllRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        if(type === 'ADD'){
            const newAnswer = {
                id: uuidv4(),
                description:"",
                isCorrect: false
            };
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }
        if(type === 'REMOVE'){
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionClone);
        }
    }
    
    const handleOnChange = (type, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        if(type === 'QUESTION'){
            let index = questionClone.findIndex(item => item.id === questionId);
            if(index > -1){
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if(index > -1 && event.target && event.target.files && event.target.files[0]){
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if(index > -1){
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if(answer.id === answerId){
                    if(type === 'CHECKBOX'){
                        answer.isCorrect = value;
                    }
                    if(type === 'INPUT'){
                        answer.description = value
                    }
                }
                return answer;
            })
            setQuestions(questionClone);
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if(index > -1){
            setDataImagePreview({
                title: questionClone[index].imageName,
                url: questionClone[index].imageFile
            });
            setIsPreviewImage(true);
        }
    }

    const handSubmitQuestion = async() => {
        // validate data
        if(_.isEmpty(selectedQuiz)){
            toast.error("Please choose a Quiz!");
            return;
        }
        // validate question
        let isValidQuestion = true;
        let indexQuestion = 0;
        for(let i = 0; i < questions.length; i++){
            if(!questions[i].description){
                isValidQuestion = false
                indexQuestion = i;
                break
            }
        }
        if(isValidQuestion === false){
            toast.error(`Not empty description for question ${indexQuestion + 1}`);
            return;
        }
        // validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for(let i=0; i< questions.length; i++){
            for(let j = 0; j < questions[i].answers.length; j++){
                if(!questions[i].answers[j]. description){
                    isValidAnswer = false;
                    indexQ = i;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if(isValidAnswer ===  false) break;
        }
        if(isValidAnswer === false){
            toast.error(`Not empty description for answer ${indexA + 1} at question ${indexQ + 1}`);
            return;
        }
        //submit questions
        for(const question of questions){
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            //submit answer
            for(const answer of question.answers){
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }
        toast.success('Create questions and answers successed!')
        setQuestions(initQuestions);
    }

    return(
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr/>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />  
                </div>
                <div className='mt-3'>
                    Add questions:
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return(
                            <div className='q-main mb-3'>
                                <div className='questions-content'>
                                    <div class="form-floating description">
                                        <input type="text" class="form-control" placeholder="Description" value={question.description}
                                        onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}/>
                                        <label>Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-upload'/>
                                        </label>
                                        <input type="file" hidden id={`${question.id}`}
                                        onChange={(event) => handleOnChangeFileQuestion(question.id, event)}/>
                                        <span>
                                            {
                                                question.imageName ? <span style={{cursor: 'pointer'}} onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span> : '0 file is uploaded'
                                            }
                                        </span>
                                    </div>
                                    <div className='btn'>
                                        <span onClick={() => handleAllRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add'/>
                                        </span>
                                        {
                                            questions.length > 1 &&
                                            <span onClick={() => handleAllRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className='icon-remove'/>
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return(
                                            <div key={answer.id} className='answers-content mt-3'>
                                                <input className='form-check-input iscorrect' type='checkbox' checked={answer.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}/>
                                                <div class="form-floating anwsers-name">
                                                    <input type="text" class="form-control" placeholder="Description" value={answer.description}
                                                    onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}/>
                                                    <label>Answers {index + 1}</label>
                                                </div>
                                                <div className='btn'>
                                                    <span>
                                                        <AiFillPlusCircle className='icon-add' onClick={() => handleAllRemoveAnswer('ADD', question.id, '')}/>
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span>
                                                            <AiOutlineMinusCircle className='icon-remove' onClick={() => handleAllRemoveAnswer('REMOVE', question.id, answer.id)}/>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> 
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button className='btn btn-primary' onClick = {() => handSubmitQuestion()}>Save Questions</button>
                    </div>
                }
                {
                    isPreviewImage === true &&
                    <Lightbox image={URL.createObjectURL(dataImagePreview.url)} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
                }    
            </div>
        </div>
    )
}

export default Questions;