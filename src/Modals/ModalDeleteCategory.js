/* Libraries Imported */
import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { doc, deleteDoc } from "firebase/firestore";

const ModalDeleteShop = (props)=> {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  /* Function to delete shop */
  const deletefunction = async()=>{
    await deleteDoc(doc(db, "users",  user?.uid, "shops", props.name, "0", props.id)).then(props.handleInc);
  }

  return ReactDOM.createPortal(
    <CSSTransition in={props.showdeletecategorymodal} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="labelmodel">
              <label>Are you sure?</label>
            </div>
            <div className="outmodel2" onClick={props.onClose}>
              <button className="authbtnactive" onClick={deletefunction}>
                Yes
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

export default ModalDeleteShop;
