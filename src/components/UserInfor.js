import React from "react";

class UserInfor extends React.Component{
    state={
        name: 'phu',
        address: 'thai binh',
        age: 26
    };

    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }
    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return(
            <div>
                my name is {this.state.name} and i'm {this.state.age}
                <form onSubmit={(event) => {this.handleOnSubmit(event)}}>
                    <label>Name: </label>
                    <input 
                    value = {this.state.name}
                    type="text"
                    onChange={(event) => {this.handleOnChangeName(event)}}/>
                    <label>Age: </label>
                    <input 
                    value = {this.state.age}
                    type="text"
                    onChange={(event) => {this.handleOnChangeAge(event)}}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfor;