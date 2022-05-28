/* Libraries Imported */
import React from "react";
import { useHistory } from 'react-router-dom'
import '../index.scss';
import {db} from '../FirestoreConnection/firebase';
import { doc, setDoc, collection, addDoc} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const CompanyInfoComponent = () => {
  /* Set variables*/
  const history = useHistory()
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dataRef = doc(db,"users", user?.uid);
  const dataAmountRef = doc(db, "users", user?.uid, "wallet", "amount")
  const dataNotificationRef = collection(db, "users", user?.uid, "notifications")
  /* Add User's data and send messege from system*/
  const handleSignUp = async(e) => {
    e.preventDefault();
    const { companycity,companycitycode,companyname, companysite,companystreet, gmail, job, name, phonenumber, surname } = e.target.elements
    await setDoc(dataRef, {
    companycity: companycity.value,
    companycitycode: companycitycode.value,
    companyname: companyname.value,
    companysite: companysite.value,
    companystreet: companystreet.value,
    gmail: gmail.value,
    job: job.value,
    name: name.value,
    phonenumber: phonenumber.value,
    surname: surname.value
    });
    setDoc(dataAmountRef,{amount: 0});
    addDoc(dataNotificationRef,{
      category: "personal",
      from: "Leaf",
      text: "Hey, nice to meet here!"
    }).then(() => {
      history.push('/')
    })
    .catch((error) => {
    });    
  }
  return (
    <form onSubmit={handleSignUp}>
      <div className="authdesk">
        <label className="authtop" >Add some info:</label>
        <div className='outprofile' style={{height:"70%"}}>
          <div className='profile1col'>
            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Company city" name="companycity"/>
              <label htmlFor="text" className="form__labellogin">Company city</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Company city code"  name="companycitycode"/>
              <label htmlFor="text" className="form__labellogin">Company city code</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Company name" name="companyname" />
              <label htmlFor="text" className="form__labellogin">Company name</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Company site" name="companysite" />
              <label htmlFor="text" className="form__labellogin">Company site</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Company street" name="companystreet"/>
              <label htmlFor="text" className="form__labellogin">Company street</label>
            </div>
          </div>
          <div className='profile2col'>
            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Contact gmail" name="gmail"/>
              <label htmlFor="text" className="form__labellogin">Contact gmail</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Your job" name="job"/>
              <label htmlFor="text" className="form__labellogin">Your job</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Your name" name="name"/>
              <label htmlFor="text" className="form__labellogin">Your name</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Contact number" name="phonenumber"/>
              <label htmlFor="text" className="form__labellogin">Contact number</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="text" className="form__fieldlogin" placeholder="Your surname" name="surname"/>
              <label htmlFor="text" className="form__labellogin">Your surname</label>
            </div>
          </div>
        </div>
        
        <div className="loginbtn">
          <button className="authbtn" type="submit">Go</button>
        </div>
      </div>
    </form>
  );
}

export default CompanyInfoComponent;
