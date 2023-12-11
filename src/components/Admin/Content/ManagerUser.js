import ModalCreateUser from "./ModalCreateUser";
import './ManagerUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {getAllUsers} from '../../../services/apiService'

const ManagerUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        const sortedUsers = res.DT.slice();
        sortedUsers.sort((a, b) => a.id - b.id);
        if(res.EC === 0){
            setListUsers(sortedUsers);
        }
    }
    useEffect(() => {
        fetchListUsers();
    }, []);

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
                    <TableUser listUsers={listUsers}/>
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers}/>
            </div>
        </div>
    )
}

export default ManagerUser;