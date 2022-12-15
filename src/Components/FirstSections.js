import React from "react";
import { SiJordan } from "react-icons/si";

const FirstSections = ({ forwardedRef }) => {
  return (
    <div className="first-section" ref={forwardedRef}>
      <div className="content">
        <div className="title-container">
          <h2>
            <span>Wear it, feel it!</span>
            <br></br>
            Wear the best fake sneakers in the world
          </h2>
        </div>
        <h3 className="sneaker-name">Nike Air Jordan</h3>
        <div className="brand-container">
          <h3 className="sneaker-brand">
            Jordan{" "}
            <span>
              <SiJordan className="jordan-logo" />
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FirstSections;
