import React from "react";
import './DisplayInfor.scss';
import logo from "./../logo.svg";

class DisplayInfor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowListUser: true
        }
        console.log(">>> call constructor: 1");
    }
    handleShowhide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }
    componentDidMount(){
        console.log(">>> call me component did mount");
        setTimeout(() => {
            document.title = "Tran Phu la toi"
        }, 3000);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(">>> call me component did update", this.props, prevProps)
        if(this.props.listUsers !== prevProps.listUsers){
            if(this.props.listUsers.length === 5){
                alert("you got 5 user")
            }
        }
    }

    render(){
        console.log(">>> call me render: ")
        const { listUsers } = this.props;
        return(
            <div>
                <div>
                    <span onClick={() => {this.handleShowhide()}}>{this.state.isShowListUser === true ? "show list user" : "hide list user"}</span>
                </div>
                { this.state.isShowListUser &&
                    <div>
                        {listUsers.map((user) => {
                            return(
                                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                    <div>
                                        <div>my name's {user.name}</div>
                                        <div>my age's {user.age}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => {this.props.handleDeleteUser(user.id)}}>delete</button>
                                    </div>
                                <hr/>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor;