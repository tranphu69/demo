import React from "react";

class DisplayInfor extends React.Component{
    render(){
        console.log(this.props);
        return(
            <div>
                <div>my name's {this.props.name}</div>
                <div>my age's {this.props.age}</div>
            </div>
        )
    }
}

export default DisplayInfor;