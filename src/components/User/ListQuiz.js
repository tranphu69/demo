import { useEffect, useState } from "react";
import {getQuizByUser} from '../../services/apiService';
import './ListQuiz.scss';

const  ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async() => {
        const  data = await getQuizByUser();
        if( data && data.EC === 0 ){
            setArrQuiz(data.DT)
        }
    }
    return(
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
                    return(
                        <div key={`${index}-quiz`} className="card" style={{width: "18rem"}}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary">Start Now</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListQuiz;