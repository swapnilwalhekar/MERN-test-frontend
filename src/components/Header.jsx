import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleConfirm = () => {
    localStorage.clear();
    setPopupVisible(false);
    navigate("/signin");
  };

  return (
    <header className="header">
      <div className="main-logo">
        <img src="../src/assets/social_media.png" alt="Logo" />
      </div>
      <div className="profile" onClick={togglePopup}>
        <img src="../src/assets/profile.png" alt="Profile" />
        {isPopupVisible && (
          <div className="profile-popup">
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleConfirm} className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
