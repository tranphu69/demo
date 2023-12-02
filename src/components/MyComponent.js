import React from "react";

class MyComponent extends React.Component{
    state={
        name: 'phu',
        address: 'thai binh',
        age: 26
    };

    handleClick = (event) => {
        console.log(this.state.name);

        this.setState({
            name:'thay doi roi'
        })
    }

    handleOnMoverOver(event){
        console.log(this.state.age);

        this.setState({
            age: Math.floor((Math.random() * 100) + 1)
        })
    }

    render(){
        return(
            <div> 
                my first {this.state.name} and i'm from {this.state.age} 
                <button onMouseOver={(event) => {this.handleOnMoverOver(event)}}>hover me</button>
                <button onClick={this.handleClick}>click me</button>
            </div>
        );
    }
}

export default MyComponent;