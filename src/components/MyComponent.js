import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component{
    render(){
        const myInfor = ['ab', 'c', 'd'];
        return(
            <div>
                <UserInfor/>
                <br/>
                <DisplayInfor name="Tran Ngoc Phu" age= "22"/>
                <hr/>
                <DisplayInfor name="Vu Duy Phong" age= "1" myInfor={myInfor}/>
            </div>
        );
    }
}

export default MyComponent;