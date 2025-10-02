import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Popup_Manager from "./components/Popup/Popup_Manager";
import axios from "axios";
import Loader from "./components/Loader";
import { showPopup } from "./features/popup";

function App() {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.theme.darkMode);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.title = "VideoGram";

    (async () => {
      try {
        const res = await axios.get(
          `https://videotube-xwsa.onrender.com/api/v1/health`
        );
        setHealth(res.data);
      } catch (error) {
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

  if (!health) return <Loader isLoading={true} />;

  return (
    <>
      <Outlet />
      <Popup_Manager />
    </>
  );
}

export default App;
