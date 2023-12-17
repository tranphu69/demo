import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import {toast} from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const {show, setShow, dataDelete} = props;
    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async() => {
        let data = await deleteQuiz(dataDelete.id)
        if(data && data.EC === 0){
            toast.success(data.EM);
            handleClose();
            props.fetchListQuizzes();
        }
        if(data && data.EC !== 0){
            toast.error(data.EM);
        }
    }

    return(
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm Delete The Quiz?</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Are you sure to delete this quiz? <b>{dataDelete && dataDelete.id ? dataDelete.name : ""}</b></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteQuiz;