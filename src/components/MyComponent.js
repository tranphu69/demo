import React from "react";

class MyComponent extends React.Component{
    state={
        name: 'phu',
        address: 'thai binh',
        age: 26
    };

    handleClick(event){
        console.log("click me");
    }

    handleOnMoverOver(event){
        console.log("hover me");
    }

    render(){
        return(
            <div> 
                my first {this.state.name} and i'm from {this.state.address} 
                <button onMouseOver={this.handleOnMoverOver}>hover me</button>
                <button onClick={this.handleClick}>click me</button>
            </div>
        );
    }
}

export default MyComponent;