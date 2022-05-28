/* Libraries Imported */
import React,{useState,useEffect} from 'react';
import Notificationimage from '../img/noti2.svg';
import Opentop from '../img/opentop1.svg';
import { collection, query, startAfter, limit, getDocs, where } from "firebase/firestore";  
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import NotificationComponent from '../Components/NotificationComponent';
const Notification = () => {
    /* Set variables*/
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const dataRef = collection(db,"users", user?.uid, "notifications");
    const [notifications, setNotifications] = useState([]);
    const [data, setData] = useState(query(dataRef, where("category", ">", ""), limit(9)));
    /* Display last 9 notifications*/
    useEffect(()=>{
        const getNotifications = async()=>{  
            const documentSnapshots = await getDocs(data);
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            console.log("last", lastVisible);
            const querySnapshot = await getDocs(data);
            setNotifications(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id})));
        };
        getNotifications();
      }, [data]);
    /* Display next 9 notifications*/
    const more =async()=>{
        const dataSnapshots = await getDocs(data);
        const lastVisible = dataSnapshots.docs[dataSnapshots.docs.length-1];
        setData(dataRef, where("category", ">", ""),startAfter(lastVisible), limit(9));
    }
    return (
    <div className="in121">
        <div className="content">
            <div className="notimain">
                <div>
                    <div className="notitop">
                        <label className="notilabel">Notification</label>
                        <div className="notilabel2">
                            <a href='google.com' className="offnotil">Mark all as read</a>
                        </div>
                        <div className="meeseget3">
                            <div className="typeicon2">
                               <img  src={Notificationimage} className="offnotiimg" alt="fireSpot"/>
                            </div>
                        </div>
                    </div>    
                    <hr className="notiline"/>
                </div>
                {notifications.map((user)=>{
                    return(
                        <NotificationComponent key={user.category+user.for+user.price+user.product_id+user.from} category={user.category} for={user.for} price={user.price} amount={user.amount} product_id={user.product_id} from={user.from} text={user.text}/>
                    );
                })}
                <button className="morenoti" onClick={more}><img src={Opentop} className='detaildownnoti' alt="fireSpot"/></button>
            </div>
        </div>
    </div>
  );
};

export default Notification;

