/* Libraries Imported */
import React from 'react';
import Detailico  from '../img/detailico.png';
import Selling from '../img/selling.svg';
import Payment from '../img/payment.svg';
import Personal from '../img/personal.svg';
import moment from 'moment';
const NotificationComponent = (props) => {
    /* Set variable*/
    const m2= moment("2022-01-23T17:04:00");
    /* Set messege icon*/
    const M0=()=>{
        if(props.category==="payment"){
            return <img  src={Payment} className="typediv" alt="fireSpot"/>;
        }if(props.category==="selling"){
            return <img  src={Selling} className="typediv" alt="fireSpot"/>
        }if(props.category==="personal"){
            return <img  src={Personal} className="typediv" alt="fireSpot"/>
        }

    }
    /* Set messege structure*/
    const M1=()=>{
        if(props.category==="payment"){
            return <div><label>{props.for}:</label><label>${props.price}</label></div>;
        }if(props.category==="selling"){
            return <div><label>Sold {props.product_id}:</label><label>${props.price},</label><label>{props.amount}kg</label></div>
        }if(props.category==="personal"){
            return <div className='clientmessege'><label>From {props.from}:</label><br/><label className='clientmessege'>{props.text}</label></div>
        }

    }
    return (
        <div className="notimessege" key={props.product_id}>
            <div className="rstatus">
                <div className="unreadmes">
                </div>
            </div>
            <div className="meeseget">
                <div className="typeicon">
                    <M0/>
                </div>
            </div>
            <div style={{width:"90%"}}>
                <M1/>
                <label>{m2.fromNow()}</label>
            </div>
            <div className='messegeget2'>
                <button className="notidetbtn" ><img src={Detailico} alt="fireSpot" style={{width:"100%", height:"100%"}}/></button>
            </div>
        </div>
    );
  }
  
  export default NotificationComponent;