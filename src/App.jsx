import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Popup_Manager from "./components/Popup/Popup_Manager";
import axios from "axios";
import Loader from "./components/Loader";
import { showPopup } from "./features/popup.js";
import ErrorPage from "./components/Pages/Service_Unavailavle.jsx";

function App() {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.theme.darkMode);
  const [health, setHealth] = useState(null);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.title = "Videogram";

    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_LINK}/health`
        );
        setHealth(res.data);
      } catch (error) {
        setServerError(true);
        dispatch(
          showPopup({
            component: "SomethingWentWrong_Popup",
            props: {
              isOpen: true,
              message: "Something went wrong!",
            },
          })
        );
      }
    })();
  }, []);

  if (serverError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Outlet />
      <Popup_Manager />
    </>
  );
}

export default App;
