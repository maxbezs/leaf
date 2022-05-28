/* Libraries Imported */
import Plus from '../img/plus.svg';
import ModalCreateShop from '../Modals/ModalCreateShop';
import { collection, getDocs } from "firebase/firestore";
import Shop from './Shop';
import {db} from '../FirestoreConnection/firebase';
import React,{useState,useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { connect } from 'react-redux'
import {  useSelector } from 'react-redux'

const ProductShopModal = (props) => {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [shops, setShops] = useState([]);
  const shopsRef = collection(db,"users", user?.uid, "shops");
  const [showModal, setShowmodal] = useState(false);
  const updateView = useSelector(state => state.count);
 
  /* Display shops */
  useEffect(()=>{
    const getShops = async()=>{      
      const data = await getDocs(shopsRef);
      setShops(data.docs.map((doc)=>({...doc.data(), id: doc.id, })));
      if (shops.length === 0) {
        console.log('The array is empty.');
        }
        else
        {
        console.log('The array has at least one or more elements.');
        }
    };
    getShops();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showModal, updateView]);
  
 /* function to Set variable*/
  const handleInc = (evt) => {
    props.dispatch({
      type: 'INCREMENT'
    })
  }
  return (
    <div key={user?.uid+"1"}>
      <h2>All your shops</h2>
        <div key={user?.uid} >
            {shops.map((shop)=>{
                return(
                    <div className="tableall1" key={shop.id}>
                        <Shop 
                          key={shop.id + shop.id}
                          name={shop.id} 
                          count={shop.categorycounter}
                          shopcity={shop.shopcity}
                          shopaddress={shop.shopaddress}
                          lat={shop.lat}
                          lng={shop.lng}
                          shopstreet={shop.shopstreet}
                          handleInc={handleInc}/>
                    </div>
                );
            })}
        </div>
        <button className="addroww" onClick={() => setShowmodal(true)}><img  src={Plus} style={{width: "100%", height: "auto"}} alt="fireSpot"/></button>
        <ModalCreateShop title="My Modal" onClose={() => setShowmodal(false)} showModal={showModal} handleInc={handleInc}/>
    </div>
  );
}
/* function to save variable changes*/
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

export default connect(mapStateToProps)(ProductShopModal);
