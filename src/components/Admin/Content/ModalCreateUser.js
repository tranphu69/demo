import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast} from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';

const ModalCreateUser = (props) => {
  const {show, setShow} = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setImage("");
    setPassword("");
    setRole("USER");
    setPreviewImage("");
    setUsername("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");
  
  const handleUploadImage = (event) => {
    if(event.target && event.target.files && event.target.files[0]){   
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }else{
      
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handSubmitCreateUser = async() => {
    //validate
    const isValidateEmail = validateEmail(email);
    if(!isValidateEmail){
      toast.error("invalid email");
      return;
    }
    if(!password){
      toast.error("invalid password");
      return;
    }

    let data = await postCreateNewUser(email, password, username, role, image);
    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
    }
    if(data && data.EC !== 0){
      toast.error(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div class="col-md-6">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <div class="col-md-6">
              <label class="form-label">Username</label>
              <input type="text" class="form-control" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
            <div class="col-md-4">
              <label class="form-label">Role</label>
              <select class="form-select" onChange={(event) => {setRole(event.target.value)}}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
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
          <Button variant="primary" onClick={() => handSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;