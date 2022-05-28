/* Libraries Imported */
import React,{useState,useEffect} from 'react';
import { collection, getDocs} from "firebase/firestore";
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { useParams } from "react-router-dom";
import ModalCreateProducts from '../Modals/ModalCreateProducts';
import Plus from '../img/plus.svg';

import { useHistory } from "react-router-dom";

const Tableproducts = () => {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [rows, setRows] = useState([]);
  const { product } = useParams();
  const { id } = useParams();
  const [showModal, setShowmodal] = useState(false);

  /* Display products' data in table*/
  useEffect(()=>{
    const getRows = async()=>{    
      const data = collection(db,"users", user?.uid, "shops", id, "0", product, "0" );  
      const dataSnap = await getDocs(data);
      setRows(dataSnap.docs.map((doc)=>({...doc.data(), id: doc.id})));
    };
    getRows();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  
  let history = useHistory(); 
  /* Function to redirect to main page */
  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        window.location.pathname = '/'
      }
    };
  }, [history])
  
  return (
    <div className="fggg3" >
      <table className="styled-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Rate</th>
            </tr>
        </thead>
        <tbody  key={user?.uid}>
          {rows.map((row)=>{
            return(
              <tr key={row.id}>
                <td><input onChange={ (event) => console.log("onchange is triggered") } className="table_input" value={row.product_name}/></td>
                <td><input onChange={ (event) => console.log("onchange is triggered") } className="table_input" value={row.product_price}/></td>
                <td><input onChange={ (event) => console.log("onchange is triggered") } className="table_input" value={row.product_weight}/>{row.product_weight_value}</td>
                <td><input onChange={ (event) => console.log("onchange is triggered") } className="table_input" value={row.product_rate}/></td>
              </tr>
              );
            })
          }
        </tbody>
      </table>
      <button onClick={() => setShowmodal(true)} className="addroww"><img  src={Plus} style={{width: "100%", height: "auto"}} alt="fireSpot"/></button>
      <ModalCreateProducts title="My Modal" onClose={() => setShowmodal(false)} showModal={showModal} id={id} product = {product}/>
    </div>
  );
}

export default Tableproducts;
