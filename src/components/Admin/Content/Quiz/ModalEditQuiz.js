import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import { putEditQuiz } from '../../../../services/apiService';

const ModalEditQuiz = (props) => {
    const {show, setShow, dataEdit} = props;
    const [name, setName] = useState("");
    const [description, setDiscription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("")

    const handleClose = () => {
        setShow(false);
        setName("");
        setDiscription("");
        setDifficulty("");
        setPreviewImage("")
        props.resetEditData();
    }

    useEffect(() => {
        if(!_.isEmpty(dataEdit)){
            setName(dataEdit.name);
            setDifficulty(dataEdit.difficulty);
            setDiscription(dataEdit.description);
            if(dataEdit.image){
                setPreviewImage(`data:image/jpeg;base64,${dataEdit.image}`);
            }
        }
    }, [dataEdit])

    const handleUploadImage = (event) => {
        if(event.target && event.target.files && event.target.files[0]){   
          setPreviewImage(URL.createObjectURL(event.target.files[0]));
          setImage(event.target.files[0]);
        }
    }

    const handSubmitEditQuiz = async() => {
        let data = await putEditQuiz(dataEdit.id, description, name, difficulty, image);
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
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update apiService quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Name: </label>
                        <input type="text" class="form-control" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Description: </label>
                        <input type="text" class="form-control" value={description} onChange={(event)=>{setDiscription(event.target.value)}}/>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Difficulty: </label>
                        <select class="form-select" value={difficulty} onChange={(event) => {setDifficulty(event.target.value)}}>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <label class="form-label label-upload" htmlFor='labelUpload'> 
                            <FcPlus/> Upload File Image
                        </label>
                        <input type="file" hidden id='labelUpload' onChange={(event) => handleUploadImage(event)}/>
                    </div>
                    <div class='col-md-12 img-preview'>
                        {previewImage ?
                        <img src={previewImage}/>
                        :
                        <span>preview image</span>
                        }
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitEditQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditQuiz;