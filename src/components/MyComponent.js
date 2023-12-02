import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component{
    state = {
        listUsers: [
            {id: 1, name: 'Tran Phu', age: '30'},
            {id: 2, name: 'Bui Vinh', age: '21'},
            {id: 3, name: 'Vu Phong', age: '25'},
        ]
    }
    render(){
        return(
            <div>
                <UserInfor/>
                <br/>
                <DisplayInfor listUsers={this.state.listUsers}/>
            </div>
        );
    }
}

export default MyComponent;