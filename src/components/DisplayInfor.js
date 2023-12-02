import React from "react";

class DisplayInfor extends React.Component{
    render(){
        const { listUsers } = this.props;
        console.log(listUsers);
        return(
            <div>
                {listUsers.map((user) => {
                    return(
                        <div key={user.id}>
                            <div>my name's {user.name}</div>
                            <div>my age's {user.age}</div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DisplayInfor;