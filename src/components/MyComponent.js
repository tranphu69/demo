import React from "react";

class MyComponent extends React.Component{
    state={
        name: 'phu',
        address: 'thai binh',
        age: 26
    };
    render(){
        return(
            <div> my first {this.state.name} and i'm from {this.state.address} </div>
        );
    }
}

export default MyComponent;