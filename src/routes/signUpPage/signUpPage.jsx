import { SignUp } from "@clerk/clerk-react";
import "./signUpPage.css";

const SignUpPage = () => {
  return (
    <div>
    <img src="/orbital.png" alt="" className="orbital" />
    <div className="signUpPage">
      <SignUp path="/sign-up" signInUrl="sign-in"/>
    </div>
    </div>
  );
};

export default SignUpPage;
