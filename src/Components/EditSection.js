import React, { useEffect, useRef } from "react";
import useGame from "../Stores/useGame";
import { CompactPicker } from "react-color";
import { AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const EditSection = ({ forwardedRef, editSectionRef }) => {
  const setEditMode = useGame((state) => state.setEditMode);
  const setFreeMode = useGame((state) => state.setFreeMode);
  const callHelper = useGame((state) => state.callHelper);
  const editMode = useGame((state) => state.editmode);
  const lightMode = useGame((state) => state.lightmode);
  const setColorIsSelected = useGame((state) => state.setColorIsSelected);
  const buttonRef = useRef(null);
  const sneakerSelector = useGame((state) => state.sneakerSelector);
  const setPrimaryColor = useGame((state) => state.setPrimaryColor);
  const setSecondaryColor = useGame((state) => state.setSecondaryColor);
  const setThirdColor = useGame((state) => state.setThirdColor);
  const setLacesColor = useGame((state) => state.setLacesColor);
  const setCurrentColor = useGame((state) => state.setCurrentColor);

  useEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      buttonRef.current,
      {
        y: "200%",
      },
      {
        y: "0%",
        duration: 4,
        scrollTrigger: {
          trigger: editSectionRef.current,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="edit-section" ref={forwardedRef}>
      <div className="content">
        <div
          className={`close-button ${editMode ? "" : "hide"} ${
            !lightMode ? "" : "dark"
          }`}
          onClick={() => {
            setFreeMode();
          }}
        >
          <AiOutlineClose size="1.5rem" />
        </div>
        <button
          ref={buttonRef}
          className={`${editMode ? "hide" : ""} ${lightMode ? "dark" : ""}`}
          onClick={() => {
            setEditMode();
          }}
        >
          Edit Sneaker
        </button>

        <div className={`editContentContainer ${editMode ? "active" : ""}`}>
          <div className="topContent">
            <div
              onClick={() => {
                setColorIsSelected();
                setPrimaryColor();
              }}
              className={`option ${
                sneakerSelector == "primary" ? "active" : ""
              } ${lightMode ? "light" : ""}`}
            >
              Primary Color
            </div>
            <div
              onClick={() => {
                setColorIsSelected();
                setSecondaryColor();
              }}
              className={`option ${
                sneakerSelector == "secondary" ? "active" : ""
              } ${lightMode ? "light" : ""}`}
            >
              Secondary Color
            </div>
            <div
              onClick={() => {
                setColorIsSelected();
                setThirdColor();
              }}
              className={`option ${
                sneakerSelector == "third" ? "active" : ""
              } ${lightMode ? "light" : ""}`}
            >
              Third Color
            </div>
            <div
              onClick={() => {
                setColorIsSelected();
                setLacesColor();
              }}
              className={`option ${
                sneakerSelector == "laces" ? "active" : ""
              } ${lightMode ? "light" : ""}`}
            >
              Laces Color
            </div>
          </div>
          <div className="bottomContent">
            <CompactPicker
              onChange={(event) => {
                setColorIsSelected();
                callHelper();
                setCurrentColor(event.hex);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSection;
