/* Libraries Imported */
import React,{useState} from 'react';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { getDocs, getDoc, setDoc, doc, collection, updateDoc, deleteField, deleteDoc} from "@firebase/firestore";

const ModalEditShop = ({ handleInc, shopcity, shopaddress, shopstreet, name, showModalEditfunction, showModalEdit })=> {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [shopcitydata, setShopcitydata] = useState(shopcity);
  const [shopaddressdata, setShopaddressdata] = useState(shopaddress);
  const [shopstreetdata, setShopstreetdata] = useState(shopstreet);
  const docRef = collection(db,"users", user?.uid, "shops", name, "0");
  /* Function to edit shop address*/
  const editName = async()=>{
    const dataRef = await getDoc(doc(db, "users",  user?.uid, "shops", name));
    const dataQuery = await getDocs(collection(db, "users",  user?.uid, "shops", name, "0"));
    const dataSnap = await getDocs(docRef);
    const lastVisible = dataSnap.docs[dataSnap.docs.length-1];
    if (typeof lastVisible == 'undefined'){
      await setDoc(doc(db, "users", user?.uid, "shops", shopstreetdata +" "+shopaddressdata+", "+ shopcitydata), {
        categorycounter: dataRef.data().categorycounter,
        shopaddress: shopaddressdata,
        shopcity: shopcitydata,
        lat: dataRef.data().lat,
        lng: dataRef.data().lng,
        shopstreet: shopstreetdata
      }).then(
        await deleteDoc(doc(db, "users",  user?.uid, "shops", name))
      ).then(handleInc());
    }else{
      await setDoc(doc(db, "users", user?.uid, "shops", shopstreetdata+" "+shopaddressdata+", "+ shopcitydata), {
        categorycounter: dataRef.data().categorycounter,
        shopaddress: shopaddressdata,
        shopcity: shopcitydata,
        lat: dataRef.data().lat,
        lng: dataRef.data().lng,
        shopstreet: shopstreetdata
      }).then(
        dataQuery.forEach(async(doc4) => {
          const dataQuery2 = await getDocs(collection(db, "users",  user?.uid, "shops", name, "0", doc4.id, "0"));
          await setDoc(doc(db, "users", user?.uid, "shops", shopstreetdata +" "+shopaddressdata+", "+ shopcitydata, "0", doc4.id), {f:0});
          await updateDoc(doc(db, "users", user?.uid, "shops", shopstreetdata +" "+shopaddressdata+", "+ shopcitydata, "0", doc4.id), {
              f: deleteField()
            }).then(
              dataQuery2.forEach(async(docc) => {
              await setDoc(doc(db, "users", user?.uid, "shops", shopstreetdata +" "+shopaddressdata+", "+ shopcitydata, "0", doc4.id,"0", docc.id), {
                product_name: docc.data().product_name,
                product_price: docc.data().product_price,
                product_weight: docc.data().product_weight,
                product_weight_value: docc.data().product_weight_value,
                product_rate: docc.data().product_rate
              }).then(
                await updateDoc(doc(db, "users",  user?.uid, "shops", name, "0", doc4.id, "0", docc.id), {
                  product_name: deleteField(),
                  product_price: deleteField(),
                  product_rate: deleteField(),
                  product_weight: deleteField(),
                  product_weight_value: deleteField()
                }).then(
                  await deleteDoc(doc(db, "users",  user?.uid, "shops", name, "0", doc4.id, "0", docc.id))
                  .then(
                    await deleteDoc(doc(db, "users",  user?.uid, "shops", name, "0", doc4.id)))
                    .then(
                      await updateDoc(doc(db, "users",  user?.uid, "shops", name), {
                        categorycounter: deleteField(),
                        lat: deleteField(),lng: deleteField(),
                        shopaddress: deleteField(),
                        shopcity: deleteField(),
                        shopstreet: deleteField()
                      })
                      .then(
                        await deleteDoc(doc(db, "users",  user?.uid, "shops", name))
                      )
                    )
                  )
                )
              
            })
          )
      
        })
      ).then(handleInc());
    }
    
  };

  return ReactDOM.createPortal(
    <CSSTransition in={showModalEdit} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={showModalEditfunction}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="labelmodel">
              <label>New shop address:</label>
            </div>
            <div className="labelmodel1">
              <input className="inputmodel" value={shopcitydata} onChange={e => setShopcitydata(e.target.value)}/>
              <input className="inputmodel" value={shopaddressdata} onChange={e => setShopaddressdata(e.target.value)}/>
              <input className="inputmodel" value={shopstreetdata} onChange={e => setShopstreetdata(e.target.value)}/>
            </div>
            <div className="outmodel2" onClick={showModalEditfunction}>
              <button className="authbtnactive" onClick={editName}>
                Edit
              </button>
              {/* close pop-up */}
              <button className="authbtnunactive" onClick={showModalEditfunction}>
                Close
              </button>
            </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default ModalEditShop;
