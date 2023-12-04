import React, { useState } from "react";

// class AddUserInfor extends React.Component{
//     state={
//         name: '',
//         age: ''
//     };

//     handleOnChangeName = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random()*100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         });
//     }

//     render() {
//         return(
//             <div>
//                 my name is {this.state.name} and i'm {this.state.age}
//                 <form onSubmit={(event) => {this.handleOnSubmit(event)}}>
//                     <label>Name: </label>
//                     <input 
//                     value = {this.state.name}
//                     type="text"
//                     onChange={(event) => {this.handleOnChangeName(event)}}/>
//                     <label>Age: </label>
//                     <input 
//                     value = {this.state.age}
//                     type="text"
//                     onChange={(event) => {this.handleOnChangeAge(event)}}/>
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfor = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleOnChangeName = (event) => {
        setName(event.target.value)
    }
    const handleOnChangeAge = (event) => {
        setAge(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
            id: Math.floor((Math.random()*100) + 1) + '-random',
            name: name,
            age: age
        });
    }

    return(
        <div>
            my name is {name} and i'm {age}
            <form onSubmit={(event) => {handleOnSubmit(event)}}>
                <label>Name: </label>
                <input 
                value = {name}
                type="text"
                onChange={(event) => {handleOnChangeName(event)}}/>
                <label>Age: </label>
                <input 
                value = {age}
                type="text"
                onChange={(event) => {handleOnChangeAge(event)}}/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfor;