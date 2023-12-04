import React, { useEffect, useState } from "react";
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
    const [isShowHideListUser, setIsShowHideListUser]= useState(true);
    const handleShowHideListUser = () => {
        setIsShowHideListUser(!isShowHideListUser);
    }
    console.log(">>> call me render");
    useEffect(() => {
        if(listUsers.length === 0){
            alert('you was delete all users')
        }
        console.log(">>call me useEffect")
    }, [listUsers])

        return(
            <div>
                <div>
                    <span onClick={() => handleShowHideListUser()}>
                        {isShowHideListUser === true ? "show list user" : "hide list user"}
                    </span>
                </div>
                { isShowHideListUser &&
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