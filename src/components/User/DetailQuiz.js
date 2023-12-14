import { useEffect } from "react";
import {useParams} from "react-router-dom"
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async() => {
        let data = await getDataQuiz(quizId);
        console.log("check data: ", data);
    }

    return(
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;