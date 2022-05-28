import React, {useContext} from 'react';
import Delete  from '../img/delete.svg';
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { doc, deleteDoc } from "firebase/firestore";
import { GlobalContext } from '../context/GlobalState';

const Transaction = (props) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  /* Function to delete shop */
  const deletefunction = async()=>{
    await deleteDoc(doc(db, "users", user?.uid, "wallet", "transactions", "0", props.id)).then(props.handleInc);
  }
  const M0=()=>{
    if(props.currency==="EUR"){
        return <label>€</label>
    }if(props.currency==="USD"){
        return <label>$</label>
    }

}
    return (
        <div className='transmain' key={props.product_id}>
          <div >
            <label>
              To: {props.userid}
            </label>
            <br/>
            <label>
              {props.text}
            </label>
            <br/>
            <label>
              {props.time}
            </label>
          </div>
          <div>
            <M0/>
            <label>
              {props.amount}
            </label>
            <button onClick={deletefunction} type="submit" className="butmax" ><img src={Delete} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button> 
          </div>
        </div>
    );
  }
  
  export default Transaction;