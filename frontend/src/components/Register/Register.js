// import NavBar from "../NavBar/Navbar"
import useInput from "../../hooks/useInput";
import { useRequest } from "../../hooks/request-hook";
import { Link } from "react-router-dom";
const isNotEmpty = value =>value.trim() !== '';
const isEmail = value => value.includes('@');
const isPassword = value => value.trim().length >= 5;
// console.log(isPassword.value)
const number = value => value.trim().length === 10;
let formValid = false;

const Register =()=>
{
  const {isError,clearError,sendRequest} =  useRequest()
  // const auth = useContext(AuthContext)
    const {
      value: nameValue,
      isValid: nameisValid,
      hasError:nameError,
      valueChangeHandler: nameChangeHandler,
      BlurHandler: nameBlurHandler,
      reset : resetName
  
    } = useInput(isNotEmpty);
  
    const {
      value: emailValue,
      isValid: emailisValid,
      hasError:emailError,
      valueChangeHandler: emailChangeHandler,
      BlurHandler: emailBlurHandler,
      reset : resetEmail
  
    } = useInput(isEmail);
  
    const {
      value: passwordValue,
      isValid: passwordisValid,
      hasError:passwordError,
      valueChangeHandler: passwordChangeHandler,
      BlurHandler: passwordBlurHandler,
      reset : resetPassword
  
    } = useInput(isPassword);
   
    const {
      value: numberValue,
      isValid: numberisValid,
      hasError:numberError,
      valueChangeHandler: numberChangeHandler,
      BlurHandler: numberBlurHandler,
      reset : resetNumber
  
    } = useInput(number);

  if(nameisValid && emailisValid && passwordisValid && numberisValid )
  {
    formValid = true
  }
  if(!nameisValid || !emailisValid || !passwordisValid || !numberisValid )
  {
    formValid= false
  }

  const submitHandler =async(e)=>{
        e.preventDefault();
        if(!formValid)
        {
          console.log("errorrrr")
          return;
        }
        
        const response = await sendRequest(
          'http://localhost:5002/users/signup',  
          'POST',
          JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            mobile: numberValue,
          }),
          {'Content-Type': 'application/json'}
          )
          
        console.log(nameValue,emailValue,passwordValue,numberValue)
        resetName()
        resetEmail()
        resetPassword()
        resetNumber()
    }
    return(
    <>
    {/* <NavBar /> */}
    <form onSubmit={submitHandler}>
    <div className="form">
    <div className="title">Registration Form</div>
    <div className="subtitle">Let's create your account!</div>
    <div className="input-container ic1">

      <input id="name" className="input" type="text" 
       onChange={nameChangeHandler} 
       onBlur={nameBlurHandler} 
       value={nameValue} 
       placeholder=" " />

      {/* <div className="cut"></div> */}
      <label for="name" className="placeholder">Name</label>

      {nameError && <p className='error-text'>Please Enter a Name!</p>}
    </div>
    <div className="input-container ic2">
      <input id="email" className="input" type="text"
      onChange={emailChangeHandler} 
      onBlur={emailBlurHandler} 
      value={emailValue}
      placeholder=" " />
      {/* <div className="cut cut-short"></div> */}
      <label for="email" className="placeholder">Email</label>
      
      {emailError && <p className='error-text'>Please Enter a valid Email!</p>}
    
    </div>
    <div className="input-container ic2">
      <input id="password" className="input" type="password"
         onChange={passwordChangeHandler} 
         onBlur={passwordBlurHandler} 
         value={passwordValue}
         placeholder=" " />
      {/* <div className="cut"></div> */}
      <label for="password" className="placeholder">Set Password</label>
      {passwordError && <p className='error-text'>Password should be atleast 5 characters long!</p>}
    
    </div>
    <div className="input-container ic2">
      <input id="mobile" className="input" type="number" 
       onChange={numberChangeHandler} 
       onBlur={numberBlurHandler} 
       value={numberValue}
       placeholder=" " />

      {/* <div className="cut cut-short"></div> */}
      <label for="mobile" className="placeholder">Mobile Number</label>
      {numberError && <p className='error-text'>Mobile Number should have 10 digits!</p>}

    </div>
    <button type="submit" disabled={!formValid} className="submit">Submit</button>

   <Link to="/login"><button className="submit">Login</button></Link>
  </div>
  </form>
  </>
    )
}

export default Register