import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../services/apiService';

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async() => {
        let res = await getAllQuizForAdmin();
        console.log(res);
        if(res && res.EC === 0){
            setListQuiz(res.DT)
            console.log(res.DT);
        }
    }

    return(
        <>
            <div>List Quizzes: </div>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return(
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{display: "flex", gap: "15px"}}>
                                        <button className='btn btn-primary'>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TableQuiz;