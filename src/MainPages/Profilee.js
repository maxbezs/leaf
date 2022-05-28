/* Libraries Imported */
import React,{useState,useEffect } from 'react';
import Close  from '../img/close.svg';
import Save  from '../img/save.svg';
import Avatarimg  from '../img/avatarimg.jpg';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import {db} from '../FirestoreConnection/firebase';
import { doc, getDoc,updateDoc } from "firebase/firestore";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

const Profilee = () => {
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const data = doc(db,"users", user?.uid);
  /* Display user's data */
  useEffect(()=>{
    const getUsers = async()=>{  
        const dataSnap = await getDoc(data);
        setJob(dataSnap.data().job);
        setCompanycitycode(dataSnap.data().companycitycode);    
        setCompanyname(dataSnap.data().companyname);    
        setCompanysite(dataSnap.data().companysite);    
        setCompanystreet(dataSnap.data().companystreet);    
        setGmail(dataSnap.data().gmail);    
        setName(dataSnap.data().name);    
        setPhonenumber(dataSnap.data().phonenumber);    
        setSurname(dataSnap.data().surname);    
    };
    getUsers();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
    /* Set variables*/
    const [job,setJob] = useState("");
    const [companycitycode,setCompanycitycode] = useState("");    
    const [companyname,setCompanyname] = useState("");    
    const [companysite,setCompanysite] = useState("");    
    const [companystreet,setCompanystreet] = useState("");    
    const [gmail,setGmail] = useState("");    
    const [name,setName] = useState("");    
    const [phonenumber,setPhonenumber] = useState("");    
    const [surname,setSurname] = useState("");   
    /* Update user's data */
    const updateUser = async ( lat) => {
      const userDoc = doc(db,"users", user?.uid);
      const newFields = { job: job,
        companycitycode: companycitycode,
        companyname: companyname,
        companysite: companysite,
        companystreet: companystreet,
        gmail:gmail,
        name:name,
        phonenumber:phonenumber,
        surname:surname
      };
      await updateDoc(userDoc, newFields);
    };
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
    <>
        <div className="profileback">
          <div className='notitop' style={{height:"5%"}}>
            {/* update user's data and redirect to Main page*/}
            <Link to="/" className='btnsbackprof'>
              <button type="submit" className="profilesavebutton" onClick={() => {updateUser(job);}} >
                <img src={Save} className="offnotiimg" alt="fireSpot"/>
              </button>
            </Link>
            <div style={{width: "96%"}}></div>
            <Link to="/" className='btnsbackprof'>
              {/* redirect to Main page*/}
              <button type="submit" className="profileclosebutton" >
                <img src={Close} style={{width:"25px",height:"25px"}} alt="fireSpot"/>
              </button>
            </Link>
          </div>
          <div className="profileimagediv">
            <img src={Avatarimg} alt="fireSpot" className="editprofilepicture"/>
          </div>
          <div className='outprofile' style={{height:"70%"}}>
            <div className='profile1col'>
              <input className="inputmodel" value={job} onChange={e => setJob(e.target.value)}/>
              <input className="inputmodel" value={companycitycode} onChange={e => setCompanycitycode(e.target.value)}/>
              <input className="inputmodel" value={companyname} onChange={e => setCompanyname(e.target.value)}/>
              <input className="inputmodel" value={companysite} onChange={e => setCompanysite(e.target.value)}/>
              <input className="inputmodel" value={companystreet} onChange={e => setCompanystreet(e.target.value)}/>
            </div>
            <div className='profile2col'>
              <input className="inputmodel" value={gmail} onChange={e => setGmail(e.target.value)}/>
              <input className="inputmodel" value={name} onChange={e => setName(e.target.value)}/>
              <input className="inputmodel" value={phonenumber} onChange={e => setPhonenumber(e.target.value)}/>
              <input className="inputmodel" value={surname} onChange={e => setSurname(e.target.value)}/>
              <button className="outbtnactive" onClick={() => auth.signOut()}>Sign out</button>
            </div>
          </div>
        </div>
    </>
  );
};

export default Profilee;


