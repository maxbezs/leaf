/* Libraries Imported */
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useHistory, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../img/opentop.svg';
import '../index.scss';

function SignupForm() {
  /* Set variables*/
  const auth = getAuth()
  const history = useHistory()
  /* Create new user by email and password */
  const handleSignUp = e => {
    e.preventDefault();
    const { email, password } = e.target.elements
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      history.push('/info')
    })
    .catch((error) => {
    });
  }
  
  return (
    <div className="outerlogin">
      <div className = "middle">
        <form onSubmit={handleSignUp}>
          <div className="authdesk">

            <label className="authtop" >Sign up</label>

            <div className="form__grouplogin fieldlogin">
              <input type="email" className="form__fieldlogin" placeholder="Email" name="email" />
              <label htmlFor="email" className="form__labellogin">Email</label>
            </div>
            
            <div className="form__grouplogin fieldlogin">
              <input type="password" className="form__fieldlogin" placeholder="Password" name="password"/>
              <label htmlFor="password" className="form__labellogin">Password</label>
            </div>
            
            <div className="loginbtn">
              <button className="authbtn" type="submit">Sign Up<Logo/></button>
            </div>

            
          </div>
          {/* Redirect to Sign in page*/}
          <Link to="/login" style={{textDecoration:"none"}}>
            <button className="authbtn1">Log in</button>
          </Link>
        </form>
      </div>  
    </div>
  );
}

export default SignupForm;
