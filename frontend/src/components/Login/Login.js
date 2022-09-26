import useInput from "../../hooks/useInput";
import { useRequest } from "../../hooks/request-hook";
import { Link } from "react-router-dom";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
let formValid = false;

const Login = () => {
  // <NavBar />

  const { isError, clearError, sendRequest } = useRequest();

  const {
    value: emailValue,
    isValid: emailisValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordisValid,
    hasError: passwordError,
    valueChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  if (emailisValid && passwordisValid) {
    formValid = true;
  }
  if (!emailisValid || !passwordisValid) {
    formValid = false;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formValid) {
      console.log("errorrrr");
      return;
    }
    const response = await sendRequest(
      "http://localhost:5002/users/login",
      "POST",
      JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
      { "Content-Type": "application/json" }
    );

    console.log(response);
    resetEmail();
    resetPassword();
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="loginform">
        <div className="title">Login</div>

        <div className="input-container ic1">
          <input
            id="email"
            className="input"
            type="text"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
            placeholder=" "
          />

          <label for="email" className="placeholder">
            Email
          </label>
          {emailError && (
            <p className="error-text">Please Enter a valid Email!</p>
          )}
        </div>
        <div className="input-container ic2">
          <input
            id="lastname"
            className="input"
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={passwordValue}
            placeholder=" "
          />
          <label for="lastname" className="placeholder">
            Password
          </label>
          {passwordError && <p className='error-text'>Password should be atleast 5 characters long!</p>}
        </div>
        <br></br>
        <button type="submit" disabled={!formValid} className="submit">
          Submit
        </button>
        <Link to="/login"><button className="submit">SignUp</button></Link>
      </div>
    </form>
  );
};

export default Login;