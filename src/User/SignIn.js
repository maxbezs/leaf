/* Libraries Imported */
import React, {useRef} from "react";
import { useHistory, Link} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as Logo } from '../img/opentop.svg';
import '../index.scss';

const SignIn = () => {
  /* Set variables*/
  const auth = getAuth();
  const history = useHistory();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  /* Sign in function by email and password */
  const signIn = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,  emailRef.current.value, passwordRef.current.value)
    .then(() => {history.push('/')})
    .catch((error) => {
    });
  }

  return (
    <div style={{width:"30%"}}>
      <div className="outerlogin">
        <div className="middle">
          <div className="authdesk">

            <label className="authtop" >Log in</label>

            <div className="form__grouplogin fieldlogin">
              <input type="email" className="form__fieldlogin" placeholder="Email" ref={emailRef}/>
              <label htmlFor="email" className="form__labellogin">Email</label>
            </div>

            <div className="form__grouplogin fieldlogin">
              <input type="password" className="form__fieldlogin" placeholder="Password" ref={passwordRef}/>
              <label htmlFor="password" className="form__labellogin">Password</label>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              {/* Redirect to Forgot Password page*/}
              <Link to="/forgotpassword">
                <p >Forgot password ?</p>
              </Link>
              <div className="loginbtn">
                <button onClick={signIn} className="authbtn">Log in<Logo/></button>
              </div>
            </div>
          </div>  
          {/* Redirect to Sign up page*/}
          <Link to="/signup" style={{textDecoration:"none"}}>
              <button className="authbtn1">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
