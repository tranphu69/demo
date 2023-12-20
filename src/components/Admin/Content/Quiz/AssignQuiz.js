import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast} from 'react-toastify';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers();
        if(res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser);
        }
    }

    const handleAssign = async() => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if(res && res.EC === 0){
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({})
        }
    }

    return(
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label>Select Quiz: </label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />  
            </div>
            <div className='col-6 form-group'>
                <label>Select Quiz: </label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />  
            </div>
            <div>
                <button className='btn btn-primary mt-3' onClick={() => handleAssign()}>Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz;