import ModalCreateUser from "./ModalCreateUser";

const ManagerUser = (props) => {
    return(
        <div className="manage-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="users-content">
                <div>
                    <button>Add new users</button>
                </div>
                <div>
                    table users
                    <ModalCreateUser/>
                </div>
            </div>
        </div>
    )
}

export default ManagerUser;