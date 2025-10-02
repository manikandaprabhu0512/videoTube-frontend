import React from "react";
import Successful_Popup from "./Successful_Popup";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../../features/popup";
import Alert_Popup from "./Alert_Popup";
import SomethingWentWrong_Popup from "./SomethingWentWrong_Popup";
import { useNavigate } from "react-router-dom";

const componentsMap = {
  Successful_Popup,
  Alert_Popup,
  SomethingWentWrong_Popup,
};

export default function Popup_Manager() {
  const popups = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  if (popups.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-50">
      {popups.map((popup) => {
        const Popupcomponent = componentsMap[popup.component];
        if (!Popupcomponent) return null;

        return (
          <Popupcomponent
            key={popup.id}
            {...popup.props}
            onClose={() => dispatch(hidePopup(popup.id))}
          />
        );
      })}
    </div>
  );
}
