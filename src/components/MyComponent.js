import React from "react";
import UserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

class MyComponent extends React.Component{
    state = {
        listUsers: [
            {id: 1, name: 'Tran Phu', age: '30'},
            {id: 2, name: 'Bui Vinh', age: '21'},
            {id: 3, name: 'Vu Phong', age: '16'},
        ]
    }

    handleAddNewUser = (userObj) => {
        console.log(">>>check data: ", userObj);
        this.setState({
            listUsers: [userObj, ...this.state.listUsers]
        })
    }

    handleDeleteUser = (userId) => {
        let listUsersClone = [...this.state.listUsers]
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        this.setState({
            listUsers: listUsersClone
        })
    }

    render(){
        return(
            <div>
                <AddUserInfor handleAddNewUser={this.handleAddNewUser}/>
                <br/>
                <DisplayInfor 
                    handleDeleteUser = {this.handleDeleteUser}
                    listUsers={this.state.listUsers}/>
            </div>
        );
    }
}

export default MyComponent;