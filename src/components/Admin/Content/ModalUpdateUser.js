import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import {ToastContainer, toast} from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash';

const ModalUpdateUser = (props) => {
  const {show, setShow, dataUpdate} = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setImage("");
    setPassword("");
    setRole("USER");
    setPreviewImage("");
    setUsername("");
    props.resetUpdateData();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if(!_.isEmpty(dataUpdate)){
      // update state
      setEmail(dataUpdate.email);
      setRole(dataUpdate.role);
      setUsername(dataUpdate.username);
      if(dataUpdate.image){
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  
  const handleUploadImage = (event) => {
    if(event.target && event.target.files && event.target.files[0]){   
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
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
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      await props.fetchListUsers();
    }
    if(data && data.EC !== 0){
      toast.error(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update apiService user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" disabled value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div class="col-md-6">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" disabled value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <div class="col-md-6">
              <label class="form-label">Username</label>
              <input type="text" class="form-control" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
            <div class="col-md-4">
              <label class="form-label">Role</label>
              <select class="form-select" value={role} onChange={(event) => {setRole(event.target.value)}}>
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

export default ModalUpdateUser;