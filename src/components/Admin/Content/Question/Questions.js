import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill, BsPatchMinusFill} from "react-icons/bs";
import {AiOutlineMinusCircle, AiFillPlusCircle} from 'react-icons/ai';
import {RiImageAddFill} from "react-icons/ri";
import {v4 as uuidv4, validate} from 'uuid';
import _ from 'lodash';

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
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
    ])

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

    const handSubmitQuestion = () => {
        console.log('questions: ', questions);
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
                        options={options}
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
                                        <span>{question.imageName ? question.imageName : '0 file is uploaded'}</span>
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
            </div>
        </div>
    )
}

export default Questions;