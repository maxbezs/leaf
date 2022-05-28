/* Libraries Imported */
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, {useRef} from "react";
import { useHistory} from 'react-router-dom';


function ForgotPassword() {
  /* Set variables*/
  const auth = getAuth();
  const emailRef = useRef(null);
  const history = useHistory();
  /* Function to send reset password mail to user's email */
  const forgot = e => {
    e.preventDefault();
    sendPasswordResetEmail(auth, emailRef.current.value)
  .then(() => {
    history.push('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
  }
  
  return (
    <div className="outer">
      <div className="middle">
        <div className="authdesk">
          <input type="email" ref={emailRef} className="form__field" placeholder="Email" />
          <label htmlFor="email" className="form__label">Email</label>
        </div>
        <button className="authbtn" onClick={forgot}>Reset Password</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
