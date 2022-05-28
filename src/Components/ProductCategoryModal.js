/* Libraries Imported */
import {useParams } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import {db} from '../FirestoreConnection/firebase';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { collection, getDocs} from "firebase/firestore";
import Plus from '../img/plus.svg';
import CategoryComponent from './CategoryComponent';
import ModalCreateCategory from '../Modals/ModalCreateCategory';
import { useHistory } from 'react-router'
import {  useSelector } from 'react-redux'
import { connect } from 'react-redux'

const ProductCategoryModal = (props) => {
  /* Set variables*/
  const { id } = useParams();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowmodal] = useState(false);
  const history = useHistory()
  const updateView = useSelector(state => state.count);

  /* Display categories */
  useEffect(()=>{
    const getCategories = async()=>{    
      const data = collection(db,"users", user?.uid, "shops", id, "0");
      const dataSnap = await getDocs(data);
      setCategories(dataSnap.docs.map((doc)=>({...doc.data(), id: doc.id})));
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, updateView]);

  const handleInc = (evt) => {
    props.dispatch({
      type: 'INCREMENT'
    })
  }
  /* Redirection to main page */
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    return history.go(0);
  };
  return (
    <div className="blog-details" key={id + "1"}>
      <h2>{ id }</h2>
      <div key={id}>
        {categories.map((category)=>{
          return(
            <div className="tableall1" key={category.id}>
              <CategoryComponent key={category.id} shopname={id} product={category.id} count={category.categorycounter} handleInc={handleInc}/>
            </div>
          );
        })}
      </div>
      {/* open pop-up */}
      <button onClick={() => setShowmodal(true)} className="addroww"><img  src={Plus} style={{width: "100%", height: "auto"}} alt="fireSpot"/></button>
      <ModalCreateCategory title="My Modal" onClose={() => setShowmodal(false)} showModal={showModal} id={id} handleInc={handleInc}/>  
    </div>
  );
}
 
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

export default connect(mapStateToProps)(ProductCategoryModal);