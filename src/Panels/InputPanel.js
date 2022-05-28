/* Libraries Imported */
import {AppContext} from '../MainPages/Menu'
import {db} from '../FirestoreConnection/firebase';
import React,{useState,useEffect, useContext} from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { collection, getDocs } from "firebase/firestore";
import {  useSelector } from 'react-redux'
import { connect } from 'react-redux'
function InputPanel() {
  /* Set variables*/
  const{ address}=useContext(AppContext);
  const [addressInputPanel,setAddress] = useState(address);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [shops, setShops] = useState([]);
  const shopsRef = collection(db,"users", user?.uid, "shops");
  const updateView = useSelector(state => state.count);

  useEffect(()=>{
    const getShops = async()=>{      
      const datam = await getDocs(shopsRef);
      setShops([]);
      datam.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setShops(shops => [...shops, doc.id]);
      });
    };
    getShops();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[updateView]);
  return (
    <div className="in112">
      {/* Find shop or product's data */}
      <input className="form__field" value={addressInputPanel} onChange={e => setAddress(e.target.value)}/>
        

        {shops
          .filter(e => e.match(new RegExp(addressInputPanel, "i")))
          .map( e =>
            <div>{ e }</div>
          )}
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      count: state.count
    }
  }
  

export default connect(mapStateToProps)(InputPanel);