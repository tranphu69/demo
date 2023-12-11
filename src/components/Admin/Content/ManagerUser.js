import ModalCreateUser from "./ModalCreateUser";
import './ManagerUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import TableUser from "./TableUser";

const ManagerUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return(
        <div className="manage-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => {setShowModalCreateUser(!showModalCreateUser)}}> 
                        <FcPlus/> Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser/>
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser}/>
            </div>
        </div>
    )
}

export default ManagerUser;