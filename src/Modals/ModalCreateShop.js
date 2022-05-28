/* Libraries Imported */
import React, { useState } from "react";
import {setDoc, doc} from "@firebase/firestore";

import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const ModalCreateShop = (props)=> {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  /* Function to create shop */
  const createUser = async()=>{
    await setDoc(doc(db, "users", user?.uid, "shops", street+" "+address+", "+ city), {
      categorycounter: 1,
      shopaddress: address,
      shopcity: city,
      lat: lat,
      lng: lng,
      shopstreet: street
    });
    props.handleInc();
  };

  return ReactDOM.createPortal(
    <CSSTransition in={props.showModal} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="labelmodel">
              <label >Add new Shop:</label>
            </div>
            <div className="outmodel">
              <div className="button_panel_model">
                <input className="inputmodel" onChange={event => setCity(event.target.value)} placeholder="city"/>
                <input className="inputmodel" onChange={event => setAddress(event.target.value)} placeholder="address"/>
              </div>
              <div className="button_panel_model">
                <input type="number" className="inputmodel" onChange={event => setLat(event.target.value)} placeholder="lat"/>
                <input type="number" className="inputmodel" onChange={event => setLng(event.target.value)} placeholder="lng"/>
              </div>
            </div>
            <div className="labelmodel1">
              <input className="inputmodel" onChange={event => setStreet(event.target.value)} placeholder="street"/>
            </div>
            <div className="outmodel2" onClick={props.onClose}>
              <button className="authbtnactive" onClick={createUser}>
                Create
              </button>
              {/* close pop-up */}
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

export default ModalCreateShop;
