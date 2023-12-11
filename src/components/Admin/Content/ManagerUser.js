import ModalCreateUser from "./ModalCreateUser";
import './ManagerUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {getAllUsers} from '../../../services/apiService'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";

const ManagerUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState([]);
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

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

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
                    <TableUser listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnView={handleClickBtnView}/>
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers}/>
                <ModalUpdateUser 
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser} 
                    dataUpdate={dataUpdate} 
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser} 
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                />
            </div>
        </div>
    )
}

export default ManagerUser;