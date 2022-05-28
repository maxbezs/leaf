/* Libraries Imported */
import { addDoc, collection} from "@firebase/firestore";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
const ModalCreateProducts = (props)=> {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [amount, setAmount] = useState(0);
  /* function to add products' data*/
  const createUser = async()=>{
    for (var i = 0; i < amount; i++) {
      await addDoc(collection(db, "users", user?.uid, "shops", props.id, "0", props.product,"0"), {
        product_name: '',
        product_price: 0,
        product_weight: 0,
        product_weight_value: '',
        product_rate: 0
      });
    } 
  }

  return ReactDOM.createPortal(
    <CSSTransition in={props.showModal} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="labelmodel">
              <label>Amount:</label>
            </div>
            <div className="labelmodel1">
              <input className="inputmodel" placeholder="Count" onChange={event => setAmount(event.target.value)}/>
            </div>
            <div className="outmodel2" onClick={props.onClose}>
              <button className="authbtnactive" onClick={createUser}>
                Add
              </button>
              <button className="authbtnunactive" onClick={props.onClose}>
                Close
              </button>
            </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default ModalCreateProducts;
