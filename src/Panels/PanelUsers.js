/* Libraries Imported */
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatarimg  from '../img/avatarimg.jpg';
import Locationico  from '../img/locationico.svg';
import Phoneico  from '../img/phoneico.svg';
import {  Link  } from 'react-router-dom'
import {db} from '../FirestoreConnection/firebase';
import { doc, getDoc } from "firebase/firestore";
import React,{useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";

function PanelUsers() {
  /* Set variables*/
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [userjob,setUserjob] = useState("");
    const [companycitycode,setCompanycitycode] = useState("");    
    const [companyname,setCompanyname] = useState("");    
    const [companysite,setCompanysite] = useState("");    
    const [companystreet,setCompanystreet] = useState("");    
    const [gmail,setGmail] = useState("");    
    const [username,setUsername] = useState("");    
    const [phonenumber,setPhonenumber] = useState("");    
    const [usersurname,setUsersurname] = useState("");   
    let history = useHistory(); 
    
    useEffect(()=>{
      const getUsers = async()=>{  
          const docRef = doc(db,"users", user?.uid);
          const docSnap = await getDoc(docRef);
          setUserjob(docSnap.data().userjob);
          setCompanycitycode(docSnap.data().companycitycode);    
          setCompanyname(docSnap.data().companyname);    
          setCompanysite(docSnap.data().companysite);    
          setCompanystreet(docSnap.data().companystreet);    
          setGmail(docSnap.data().gmail);    
          setUsername(docSnap.data().name);    
          setPhonenumber(docSnap.data().phonenumber);    
          setUsersurname(docSnap.data().surname);    
      };
      getUsers();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    /* Function to display user's data */
    useEffect(() => {
      return () => {
        if (history.action === "POP") {
          window.location.pathname = '/'
        }
      };
    }, [history])
  return (
    
    <div className="in21">
      <div className="in211">
        {/* Redirect to Profile page*/}
        <Link to="/profile" style={{ textDecoration: 'none'}}>
          <div className="infotopr">
            <div className="infotop">
              <div>
                <img src={Avatarimg} alt="fireSpot" className="tyt"/>
              </div>
              <div>
                <label className="ffff">{userjob}</label>
              </div>
            </div>
            <div className="infotoprtr">
              <label className="ffff">{username}</label>
              <label className="ffff">{usersurname}</label>
              <br/>
              <label className="ffff">{companystreet}</label>
              <br/>
              <label className="ffff">{companyname}</label>
              <div className="ppp">
                <div className="thtt">
                  <img src={Locationico} alt="fireSpot" className="ght"/>
                  <label className="ffff">{companycitycode}</label>
                </div>
                <div className="thtt">
                  <img src={Phoneico} alt="fireSpot" className="ght"/>
                  <label className="ffff">{phonenumber}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="ffff">
            <hr className="njn" />
            <label className="ffff">{companysite} | {gmail}</label>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PanelUsers;