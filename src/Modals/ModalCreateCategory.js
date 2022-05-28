/* Libraries Imported */
import { addDoc, setDoc, doc, collection, updateDoc, deleteField} from "@firebase/firestore";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
const ModalCreateCategory = (props)=> {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  
  const [categoryname, setCategoryname] = useState()
  const [product_name, setProductName] = useState()
  const [product_price, setProductPrice] = useState()
  const [product_weight, setProductWeight] = useState()
  const [product_weight_value, setProductWeightValue] = useState('g')
  /* Function to create new category and first product*/
  const createUser = async()=>{
    await setDoc(doc(db, "users", user?.uid, "shops", props.id, "0", categoryname), {f:0})
    .then(await addDoc(collection(db, "users", user?.uid, "shops", props.id, "0", categoryname,"0"), {
      product_name: product_name,
      product_price: product_price,
      product_weight: product_weight,
      product_weight_value: product_weight_value,
      product_rate: 0
    }));
    await updateDoc(doc(db, "users", user?.uid, "shops", props.idd, "0", categoryname), {
      f: deleteField()
    });
  }

  return ReactDOM.createPortal(
    <CSSTransition in={props.showModal} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="labelmodel">
              <label>Add new Category:</label>
            </div>
            <div className="labelmodel1">
              <input className="inputmodel" placeholder="name"onChange={event => setCategoryname(event.target.value)}/>
            </div>
            <div className="outmodel">
              <div className="button_panel_model">
                <input className="inputmodel" placeholder="product_name" onChange={event => setProductName(event.target.value)}/>
                <input className="inputmodel" placeholder="product_price" onChange={event => setProductPrice(event.target.value)}/>
              </div>
              <div className="button_panel_model">
                <input className="inputmodel" placeholder="product_weight" onChange={event => setProductWeight(event.target.value)}/>
                <select value={product_weight_value} onChange={event => setProductWeightValue(event.target.value)} >
                  <option defaultValue value='g' >g</option>
                  <option value='kg'>kg</option>
              </select>
              </div>
            </div>
            <div className="outmodel2" onClick={props.onClose}>
              <button className="authbtnactive" onClick={createUser}>
                Create
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

export default ModalCreateCategory;
