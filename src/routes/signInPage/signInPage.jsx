import { SignIn } from "@clerk/clerk-react";
import "./signInPage.css";

const SignInPage = () => {
  return (
    <div>
    <img src="/orbital.png" alt="" className="orbital" />
    <div className="signInPage">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/questions"
      />
    </div>
    </div>
  );
};

export default SignInPage;
