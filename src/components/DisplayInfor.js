import React from "react";
import './DisplayInfor.scss';

// class DisplayInfor extends React.Component{
//     render(){
//         const { listUsers } = this.props;
//         return(
//             <div>
//                 { true &&
//                     <div>
//                         {listUsers.map((user) => {
//                             return(
//                                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                                     <div>
//                                         <div>my name's {user.name}</div>
//                                         <div>my age's {user.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => {this.props.handleDeleteUser(user.id)}}>delete</button>
//                                     </div>
//                                 <hr/>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUsers } = props;
        return(
            <div>
                { true &&
                    <div>
                        {listUsers.map((user) => {
                            return(
                                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                    <div>
                                        <div>my name's {user.name}</div>
                                        <div>my age's {user.age}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => {props.handleDeleteUser(user.id)}}>delete</button>
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

export default DisplayInfor;