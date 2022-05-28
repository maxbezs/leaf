/* Libraries Imported */
import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { doc, updateDoc, deleteDoc, getDocs, collection, deleteField } from "firebase/firestore";

const ModalDeleteShop = ({handleInc, name, showModalDelete, showModalDeletefunction})=> {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  /* Function to delete shop */
  const deletefunction = async()=>{
    const checkdata = await getDocs(collection(db, "users",  user?.uid, "shops", name, "0"));
    if (typeof lastVisible == 'undefined'){
      await deleteDoc(doc(db, "users",  user?.uid, "shops", name)).then(handleInc());
    }else{
      checkdata.forEach(async( dataid) => {
        const datadetails = await getDocs(collection(db, "users",  user?.uid, "shops", name, "0", dataid.id, "0"));
        datadetails.forEach(async( dataid1) => {
          await updateDoc(doc(db, "users",  user?.uid, "shops", name, "0", dataid.id, "0", dataid1.id), {
              product_name: deleteField(),
              product_price: deleteField(),
              product_rate: deleteField(),
              product_weight: deleteField(),
              product_weight_value: deleteField()
          }).then(await deleteDoc(doc(db, "users",  user?.uid, "shops", name, "0", dataid.id, "0", dataid1.id))).then(
            await deleteDoc(doc(db, "users",  user?.uid, "shops", name, "0", dataid.id))
          ).then(
            await updateDoc(doc(db, "users",  user?.uid, "shops", name), {
              categorycounter: deleteField(),
              lat: deleteField(),
              lng: deleteField(),
              shopaddress: deleteField(),
              shopcity: deleteField(),
              shopstreet: deleteField()
          }).then(
            await deleteDoc(doc(db, "users",  user?.uid, "shops", name))
          ).then(
            handleInc()
            )
          );
        });
      })
    }
  }

  return ReactDOM.createPortal(
    <CSSTransition in={showModalDelete} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={showModalDeletefunction}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="labelmodel">
              <label>Are you sure?</label>
            </div>
            <div className="outmodel2" onClick={showModalDeletefunction}>
              <button className="authbtnactive" onClick={deletefunction}>
                Yes
              </button>
              {/* close pop-up */}
              <button className="authbtnunactive" onClick={showModalDeletefunction}>
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
