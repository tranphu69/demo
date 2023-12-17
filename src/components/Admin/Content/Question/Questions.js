import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill, BsPatchMinusFill} from "react-icons/bs";
import {AiOutlineMinusCircle, AiFillPlusCircle} from 'react-icons/ai';

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    return(
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr/>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select QUiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />  
                </div>
                <div className='mt-3'>
                    Add questions:
                </div>
                <div>
                    <div className='questions-content'>
                        <div class="form-floating description">
                            <input type="text" class="form-control" placeholder="Description"/>
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image</label>
                            <input type="file" hidden/>
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn'>
                            <span>
                                <BsFillPatchPlusFill className='icon-add'/>
                            </span>
                            <span>
                                <BsPatchMinusFill className='icon-remove'/>
                            </span>
                        </div>
                    </div>
                    <div className='answers-content mt-3'>
                        <input className='form-check-input iscorrect' type='checkbox'/>
                        <div class="form-floating anwsers-name">
                            <input type="text" class="form-control" placeholder="Description"/>
                            <label>Answers 1</label>
                        </div>
                        <div className='btn'>
                            <span>
                                <AiFillPlusCircle className='icon-add'/>
                            </span>
                            <span>
                                <AiOutlineMinusCircle className='icon-remove'/>
                            </span>
                        </div>
                    </div>
                </div>           
            </div>
        </div>
    )
}

export default Questions;