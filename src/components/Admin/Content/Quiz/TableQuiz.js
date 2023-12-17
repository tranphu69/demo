import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../services/apiService';

const TableQuiz = (props) => {
    const {listQuiz} = props;
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
                                        <button className='btn btn-primary'onClick={() => props.handleClickBtnEdit(item)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => props.handleClickBtnDelete(item)}>Delete</button>
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