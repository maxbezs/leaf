/* Libraries Imported */
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Opentop from '../img/opentop1.svg';
import Delete  from '../img/delete.svg';
import ModalDeleteCategory from '../Modals/ModalDeleteCategory';

const CategoryComponent = (props) => {
  const [showdeletecategorymodal, setShowdeletecategorymodal] = useState(false);

  return (
    <div className="fggg" key={props.product}>
      <div className="coteg">
        <button onClick={() => setShowdeletecategorymodal(true)} className="butmax" ><img src={Delete} style={{width:"25px",height:"25px"}} alt="fireSpot"/></button> 
        <div>
          <label className="ffff1">{props.product}</label>
        </div>
        <div style={{width: "100%"}}>
          {/* Redirect to products' data*/}
          <Link to={`/${props.shopname}/${props.product}`}className="link" >
            <button className="butmax"><img src={Opentop} className='detaildown' alt="fireSpot"/></button>
          </Link>
        </div>
        <ModalDeleteCategory title="My Modal" onClose={() => setShowdeletecategorymodal(false)} name={props.shopname} showdeletecategorymodal={showdeletecategorymodal} id={props.product} handleInc={props.handleInc}/>
      </div>
    </div>       
  );
}

export default CategoryComponent;
