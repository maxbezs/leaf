/* Libraries Imported */
import React, { useState, useContext } from "react";
import Editicon  from '../img/editicon.svg';
import Listicon  from '../img/listicon.svg';
import { useHistory } from 'react-router-dom'
import { AppContext } from "../MainPages/Menu";
import Save  from '../img/save.svg';
import Close  from '../img/close.png';
import Delete  from '../img/delete.svg';
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { doc, updateDoc } from "firebase/firestore";
import ModalEditShop from '../Modals/ModalEditShop';
import ModalDeleteShop from '../Modals/ModalDeleteShop';

const Shop = ({ lat, lng, shopcity, shopaddress, shopstreet, name, count, handleInc}) => {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const history = useHistory();
  const {setAddress}=useContext(AppContext);
  const [showModalDelete, setShowModalDelete]=useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [newlat, setNewlat] = useState(lat);
  const [newlng, setNewlng] = useState(lng);
  const [mode, setMode] = useState(false);
  
  
  /* Change shops' data*/
  const updateUser = async ( newlat) => {
    const userDoc = doc(db,"users", user?.uid, "shops", name);
    const newLatlng = {
      lat: newlat,
      lng: newlng,
    };
    await updateDoc(userDoc, newLatlng);
  };
  /* open pop-ups */
  const showModalDeletefunction = ()=>{
    setShowModalDelete(false);
  }
  const showModalEditfunction = ()=>{
    setShowModalEdit(false);
  }
  
  /* checking if editing shop button was pressed */
  const onClickCheck = () => {
    setMode(!mode);
    handleInc();
  }

  const shopDetail =()=>{
    history.push(`/${name}`, { from: "Shop" });
    setAddress(name);
  }
  return (
    <div className="fggg" key={name}>
      <div className="component">
        <div style={{display: "flex"}}>
          <div style={{width: "50%"}}>
            {mode ? <button type="submit" className="butmax" onClick={() => setShowModalDelete(true)} ><img src={Delete} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button> :<button type="submit" onClick={onClickCheck} className="butmax" ><img src={Editicon} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button> }
          </div>
          <div style={{width: "50%"}}>
            {mode ? <button type="submit" onClick={onClickCheck} className="butmax" ><img src={Close} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button> :<button onClick={shopDetail} className="butmax"><img src={Listicon} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button>}
          </div>
        </div>
        {mode ? <div style={{width: "90%"}} ><input className="inputmodel" value={newlat} onChange={e => setNewlat(e.target.value)}/><input className="inputmodel" value={newlng} onChange={e => setNewlng(e.target.value)}/><label className="ffff1">{name}</label> <button type="submit" onClick={() => setShowModalEdit(true)} className="butmax" ><img src={Editicon} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button> <br/><button type="submit" onClick={() => {updateUser(newlat);}} className="butmax" ><img src={Save} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button></div>: <div><label className="ffff1">{name}</label><br /><label className="ffff1">{count}</label></div>}
      </div>
      {/* open pop-up */}
      <ModalDeleteShop title="My Modal" 
        showModalDeletefunction={showModalDeletefunction} 
        showModalDelete={showModalDelete} 
        name={name} 
        handleInc = {handleInc}/>
      {/* open pop-up */}
      <ModalEditShop title="My Modal" 
        showModalEditfunction={showModalEditfunction} 
        showModalEdit={showModalEdit} 
        name={name} 
        shopcity={shopcity}
        shopaddress={shopaddress}
        shopstreet={shopstreet}
        handleInc = {handleInc}/>
    </div>
  );
}


export default Shop;