import React, { useEffect, useState } from "react";
import EmailEntry from "./ForgetPasswordPages/EmailEntry";
import Reset_Password from "./ForgetPasswordPages/Reset_Password";
import OTP_Input from "../../utils/OTP_Input";

function ForgotPassword() {
  useEffect(() => {
    document.title = "Videogram | Reset Password";
  }, []);

  const [steps, setSteps] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const nextStep = () => {
    setSteps(steps + 1);
  };

  const prevStep = () => {
    setSteps(steps - 1);
  };

  return (
    <>
      {steps === 1 && (
        <EmailEntry
          nextStep={nextStep}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
        />
      )}
      {steps === 2 && (
        <OTP_Input
          username={username}
          nextStep={nextStep}
          process="forgotPasswordProcess"
        />
      )}
      {steps === 3 && (
        <Reset_Password email={email} nextStep={nextStep} prevStep={prevStep} />
      )}
    </>
  );
}

export default ForgotPassword;
