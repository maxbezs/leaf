/* Libraries Imported */
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {db} from '../FirestoreConnection/firebase';
import { doc, getDoc } from "firebase/firestore";
import React,{useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {  useSelector } from 'react-redux'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
const data = [{name: '01.04', uv: 0}, {name: '02.04', uv: 50}, {name: '03.04', uv: 150}, {name: '04.04', uv: 80}, {name: '05.04', uv: 100}, {name: '06.04', uv: 130} , {name: '07.04', uv: 60}, {name: '08.04', uv: 0}, {name: '09.04', uv: 0}];


const PanelFinance =({tool})=>{
  /* Set variables*/
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [balance, setBalance] = useState(0);
  const updateView = useSelector(state => state.count);

  /* Function to display user's balance */
  useEffect(()=>{
    const getNotifications = async()=>{  
      const ref = doc(db, "users", user?.uid, "wallet", "amount");
      const docSnapp = await getDoc(ref);
      setBalance(docSnapp.data().amount);
    };
    getNotifications();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[updateView]);
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
    <div className="in23">
      <div className="in213">
      {/* Display second tool */}
      <button onClick={() => tool("SecondTool")} style={{ textDecoration: 'none', background: "none", border: "none", height: "100%", width: "100%" }}>
        <div className="pricegraph">
          <div className="mmm">
            <select>
              <option>Week</option>
              <option>Year</option>
              <option>Month</option>
            </select>
          </div>
          
          <label className="kkk">${balance}</label>

          
          <div className="hjj">
            <label className="lll">+{balance}% compared to last week</label>
          </div>
            <ResponsiveContainer width="99%" aspect={1}>
              <LineChart width={ "50%" } height={ "35%" } data={data} margin={{ top: 20, right: 30, bottom: 10, left: 0 }} >
              <Line type="monotone" dataKey="uv" stroke="#36f540" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </button>
        
      </div>
    </div>
  );
}

export default PanelFinance;