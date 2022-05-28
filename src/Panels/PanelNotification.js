/* Libraries Imported */
import React,{useState,useEffect} from 'react';
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { query, where, collection, getDocs} from "firebase/firestore";
import { useHistory } from "react-router-dom";

const PanelNotification =({tool})=>{
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const docRef = collection(db,"users", user?.uid, "notifications");    
  const [amountsellingnotification,setAmountsellingnotification] = useState(0);  
  const [sellingarray, setSellingarray] = useState([]);
  const [amountpersonalnotification,setAmountpersonalnotification] = useState(0);  
  const [personalarray, setPersonalarray] = useState([]);
  const [amountpaymentnotification,setAmountpaymentnotification] = useState(0);  
  const [paymentarray, setPaymentarray] = useState([]);
    
  const queryselling = query(docRef, where("category", "==", "selling"));
  const querypersonal = query(docRef, where("category", "==", "personal"));
  const querypayment = query(docRef, where("category", "==", "payment"));

  let history = useHistory(); 
  /* Function to redirect to main page */
  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        window.location.pathname = '/'
      }
    };
  }, [history])
  /* Function to display notifications' amount by categories */
  useEffect(()=>{
    const getUsers = async()=>{  
      const querySnapshot = await getDocs(queryselling);
      const querySnapshot1 = await getDocs(querypersonal);
      const querySnapshot11 = await getDocs(querypayment);
      querySnapshot.forEach((doc) => {
        setSellingarray(sellingarray.push(doc.id));
        setAmountsellingnotification(sellingarray.length);
      });
      querySnapshot1.forEach((doc) => {
        setPersonalarray(personalarray.push(doc.id));
        setAmountpersonalnotification(personalarray.length);
      });
      querySnapshot11.forEach((doc) => {
        setPaymentarray(paymentarray.push(doc.id));
        setAmountpaymentnotification(paymentarray.length);
      });
    };
    getUsers();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="in24">
        <div className="in214">
          <div onClick={() => tool("FourthTool")} style={{ textDecoration: 'none', background: "none", border: "none", height: "100%", width: "100%" }}>
            <div className="middle">
              <div style={{display: "flex"}}>
                <div className="uuu1">
                  <label style={{color:"#1a1a1a", height: "100%", marginTop:"5px"}}>Notification</label>
                </div>
              </div>
              <hr className="fff" />
              <div style={{display: "flex"}}>
                <div className="uuu">
                  <label style={{color:"#414246"}}>Selling</label> 
                </div>
                <div className="fgfg">
                  <label style={{color:"#414246", fontSize:"15px"}}>{amountsellingnotification}</label>
                </div>
              </div>
              <hr className="fff" />
              <div style={{display: "flex"}}>
                <div className="uuu">
                  <label style={{color:"#414246"}}>Personal</label>
                </div>
                <div className="fgfg">
                  <label style={{color:"#414246", fontSize:"15px"}}>{amountpersonalnotification}</label>
                </div>
              </div>
              <hr className="fff"/>
              <div style={{display: "flex"}}>
                <div className="uuu">
                  <label style={{color:"#414246"}}>Payment</label>
                </div>
                <div className="fgfg">
                  <label style={{color:"#414246", fontSize:"15px"}}>{amountpaymentnotification}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default PanelNotification;