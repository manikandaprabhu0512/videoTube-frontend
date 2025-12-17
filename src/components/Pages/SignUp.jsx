import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { showPopup } from "../../features/popup.js";
import { Change } from "../../assets/Icons";
import UserInformation from "./SignUpPages/UserInformation.jsx";
import { useRegisterUser } from "../hooks/useUser.js";
import OTP_Input from "../../utils/OTP_Input.jsx";
import UserAvatar from "./SignUpPages/UserAvatar.jsx";
import UserCoverImage from "./SignUpPages/UserCoverImage.jsx";
import Biography from "./SignUpPages/Biography.jsx";
import TermsAndConditions from "./SignUpPages/Terms&Conditions.jsx";

function SignUp() {
  useEffect(() => {
    document.title = "Videogram | Sign Up";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    biography: "",
    avatarFile: "",
    coverFile: "",
  });

  const [steps, setSteps] = useState(1);

  const updateForm = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setSteps(steps + 1);
  const prevStep = () => setSteps(steps - 1);

  const { mutate: registerNewUser, isPending } = useRegisterUser();

  const handleSubmit = (e) => {
    console.log(formData);

    e.preventDefault();

    registerNewUser(formData, {
      onSuccess: () => {
        dispatch(
          showPopup({
            component: "Successful_Popup",
            props: {
              isOpen: true,
              message: "🎉 Registered successfully!",
            },
          })
        );
        navigate(`/`);
      },
      onError: () => {
        alert("User Already Exists");
        window.location.href = "/";
      },
    });
  };

  if (isPending) return <Loader isLoading={true} />;

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {steps === 1 && (
          <UserInformation
            data={formData}
            updateForm={updateForm}
            nextStep={nextStep}
          />
        )}
        {steps === 2 && (
          <OTP_Input
            username={formData.username}
            nextStep={nextStep}
            prevStep={prevStep}
            process="registerUserProcess"
          />
        )}
        {steps === 3 && (
          <UserAvatar
            data={formData}
            updateForm={updateForm}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {steps === 4 && (
          <UserCoverImage
            data={formData}
            updateForm={updateForm}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {steps === 5 && (
          <Biography
            data={formData}
            updateForm={updateForm}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {steps === 6 && (
          <TermsAndConditions prevStep={prevStep} handleSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
}

export default SignUp;
