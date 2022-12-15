import React from "react";
import useGame from "../Stores/useGame";
import FakeSneakerRedLogo from "../assets/logos/fake-sneaker-red-logo.png";
import FakeSneakerPurpleLogo from "../assets/logos/fake-sneaker-purple-logo.png";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  const setLightMode = useGame((state) => state.setLightMode);
  const setDarkMode = useGame((state) => state.setDarkMode);
  const lightMode = useGame((state) => state.lightmode);

  const onInputChangeHandler = () => {
    if (lightMode) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <header>
      <nav>
        <div className="logo-navbar">
          <img src={FakeSneakerRedLogo} alt="logo" />
          <img
            className={`purpleLogo ${lightMode ? "" : "active"}`}
            src={FakeSneakerPurpleLogo}
            alt="logo"
          />
        </div>

        <label className="switch">
          <input
            type="checkbox"
            className={lightMode ? "" : "checked"}
            onChange={onInputChangeHandler}
          ></input>
          <span className="slider"></span>
          <span className="on">
            <BsSunFill />
          </span>
          <span className="off">
            <BsFillMoonStarsFill />
          </span>
        </label>
      </nav>
    </header>
  );
};

export default Navbar;
