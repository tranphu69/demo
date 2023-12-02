import React from "react";

class MyComponent extends React.Component{
    state={
        name: 'phu',
        address: 'thai binh',
        age: 26
    };

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render(){
        return(
            <div> 
                my name is {this.state.name} and i'm {this.state.age}
                <form onSubmit={(event) => {this.handleOnSubmit(event)}}>
                    <input 
                    type="text"
                    onChange={(event) => {this.handleOnChangeInput(event)}}/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;