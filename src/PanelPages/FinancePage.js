/* Libraries Imported */
import React,{useState,useEffect} from 'react';
import {db} from '../FirestoreConnection/firebase';
import { where, addDoc, getDoc, doc, collection, updateDoc, orderBy, limit, getDocs, query} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Transaction  from '../Components/Transaction';
import { connect } from 'react-redux'
import {  useSelector } from 'react-redux'
import moment from 'moment'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const FinancePage = (props) =>{
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [text, setText] = useState('');
  const [amountm, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [userid, setUserid] = useState("");
  const [currency, setCurrency] = useState('USD');
  const updateView = useSelector(state => state.count);
  const [transactions, setTransactions] = useState([]);
  const [expence, setExpence]= useState(0);
  const [income, setIncome]= useState(0);
  const datam = [{name: '01.04', uv: 0}, {name: '02.04', uv: 50}, {name: '03.04', uv: 150}, {name: '04.04', uv: 80}, {name: '05.04', uv: 100}, {name: '06.04', uv: 130} , {name: '07.04', uv: 60}, {name: '08.04', uv: 0}, {name: '09.04', uv: 0}];

  const handleInc = (evt) => {
    props.dispatch({
      type: 'INCREMENT'
    })
  }
  useEffect(()=>{
    const getNotifications = async()=>{  
      const ref = doc(db, "users", user?.uid, "wallet", "amount");
      const docSnap = await getDoc(ref);
      setBalance(docSnap.data().amount);

      const incomeque = query(collection(db, "users", user?.uid, "wallet", "transactions", "0"), where("to", "!=", user?.uid));

      const incomeseq = await getDocs(incomeque);
      incomeseq.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setExpence(expence  + parseFloat(doc.data().amount));
        console.log("expence: "+expence)
      });
      const incomeque1 = query(collection(db, "users", user?.uid, "wallet", "transactions", "0"), where("to", "==", user?.uid));
      const incomeseq1 = await getDocs(incomeque1);
      incomeseq1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setIncome(income  + parseFloat(doc.data().amount));
        console.log("income: "+income)
      });
    };
    const getNotifications1 = async()=>{  
      const querySnapshot = await getDocs(query(collection(db, "users", user?.uid, "wallet", "transactions", "0"),
       orderBy("time", 'desc'), limit(5)));
      setTransactions(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id})));
    };
    getNotifications1();
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateView]);
  
  const addTrans = async()=>{
    setUserid(userid);
    console.log(userid);
    const hip = await doc(db, "users", userid, "wallet", "amount");
    const hipp = await getDoc(hip);
    setAmount(parseFloat(amountm, 10));
    await addDoc(collection(db, "users", user?.uid, "wallet", "transactions", "0" ), {
      amount: parseFloat(amountm, 10),
      text: text,
      from: user?.uid,
      to: userid,
      time: moment().format('LTS'),
      currency: currency,
      balance: balance
    });
    await addDoc(collection(db, "users", userid, "wallet", "transactions", "0" ), {
      amount: parseFloat(amountm, 10),
      text: text,
      from: user?.uid,
      to: userid,
      time: moment().format('LTS'),
      currency: currency,
      balance: balance
    });
    await updateDoc(doc(db, "users", user?.uid, "wallet", "amount"), {
      amount: balance-amountm
    }).then(console.log("+ to 2 user balance" + parseFloat(amountm, 10)))
    await updateDoc(doc(db, "users", userid, "wallet", "amount"),{
      amount: parseFloat(hipp.data().amount, 10) + parseFloat(amountm, 10)
    }).then(console.log(hipp.data().amount)).then(handleInc()).then(window.location.reload(false));
    
  }
  return (
    <div className="in121">
      <div className='mainfinance'>
        <div className= "containerfinance">
          <div className='firstfinance'>
            <label className="kkk1">Your Balance</label>
            <br/>
            <label className="kkk">${balance}</label>
          </div>
          <div className="secondfinance">
            <div className="income">
              <label className="kkk1">Income</label>
              <p className="money plus">{0}</p>
            </div>
            <div className="expence">
              <label className="kkk1">Expense</label>
              <p className="money minus">{expence}</p>
            </div>
          </div>
          <div className="thirdfinance">
            <label className="kkk1">Add new transaction</label>
            <div className="labelmodel1">
              <input className="inputmodel" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..."/>
              <input type="number" className="inputmodel" value={amountm} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..."/>
              <select value={currency} onChange={e => setCurrency(e.target.value)} >
                <option defaultValue value='USD' >USD</option>
                <option value='EUR'>EUR</option>
              </select>
            </div>
            <div className="labelmodel2">
              <input className="inputmodel" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="Paste user id..."/>
              <button className="authbtnactive" onClick={addTrans}>Add transaction</button>
            </div>
          </div>
          <div className='fourthfinance'>
            <label className="kkk1">History</label>
            <div className="list">
                {transactions.map((transaction)=>{
                  return(
                    <Transaction handleInc = {handleInc} key={transaction.time} id={transaction.id} amount={transaction.amount} userid={transaction.to} text={transaction.text} time={transaction.time} currency={transaction.currency} />
                  );
                })}
            </div>
          </div>
        </div>
        <div className='containerfinancegraph'>
          <div className="balanceamountgraph">
            <label className="kkk1">Balance status:</label>
            <ResponsiveContainer width="100%" height={"100%"}>
              <LineChart width={ "50%" } height={ "35%" } data={datam}  >
              <Line type="monotone" dataKey="uv" stroke="#36f540" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <div className="pnlgraph">
            <label className="kkk1">PNL</label>
            <ResponsiveContainer width="100%" height={"100%"}>
              <LineChart width={ "50%" } height={ "35%" } data={datam}  >
              <Line type="monotone" dataKey="uv" stroke="#36f540" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
  
}
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

export default  connect(mapStateToProps)(FinancePage);