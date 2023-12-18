import { useEffect, useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService';
import {toast} from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalEditQuiz from './ModalEditQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
  ];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [dataEdit, setDataEdit] = useState({});

    useEffect(() => {
        fetchListQuizzes();
    }, [])

    const fetchListQuizzes = async() => {
        let res = await getAllQuizForAdmin();
        if(res.EC === 0){
            setListQuiz(res.DT);
        }
    }

    const handleChangeFile = (event) => {
        if(event.target && event.target.files && event.target.files[0]){   
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async() => {
        // validate
        if(!name || !description){
            toast.error('Name/Description is required');
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if(res && res.EC === 0){
            toast.success(res.EM);
            fetchListQuizzes();
            setName('');
            setDescription('');
            setImage(null);
        }else{
            toast.error(res.EM);
        }
    }

    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz)
    }

    const handleClickBtnEdit  = (quiz) => {
        setShowModalEditQuiz(true);
        setDataEdit(quiz);
    }

    const resetEditData = () => {
        setDataEdit({})
    }

    return(
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manager quizzes</Accordion.Header>
                    <Accordion.Body>
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder='Name' onChange={(event) => setName(event.target.value)}/>
                                <label>Name: </label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" value={description} placeholder='Description' onChange={(event) => setDescription(event.target.value)}/>
                                <label>Description: </label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={"Quiz type..."}
                                />
                            </div>
                            <div className='more-actions'>
                                <label className='mb-1'>Upload Image: </label>
                                <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)}/>
                            </div>
                            <div className='mt-3'>
                                <button onClick={() => handleSubmitQuiz()} className='btn btn-primary'>Save</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz
                            listQuiz = {listQuiz}
                            handleClickBtnDelete={handleClickBtnDelete}
                            fetchListQuizzes = {fetchListQuizzes}
                            handleClickBtnEdit = {handleClickBtnEdit}
                        />
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete = {dataDelete}
                fetchListQuizzes = {fetchListQuizzes}
            />
            <ModalEditQuiz
                show={showModalEditQuiz}
                setShow = {setShowModalEditQuiz}
                dataEdit = {dataEdit}
                fetchListQuizzes = {fetchListQuizzes}
                resetEditData = {resetEditData}
            />
        </div>
    )
}

export default ManageQuiz;