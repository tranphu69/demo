import React from "react";

class DisplayInfor extends React.Component{
    state = {
        isShowListUser: true
    }
    handleShowhide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render(){
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
                                    <div>my name's {user.name}</div>
                                    <div>my age's {user.age}</div>
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