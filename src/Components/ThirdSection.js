import React, { useRef, useEffect } from "react";

import EmojiHandMouth from "../assets/emojis/face-with-hand-over-mouth.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ThirdSection = ({ forwardedRef, thirdSectionRef }) => {
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);

  useEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      textLeftRef.current,
      {
        opacity: 0,
        top: "-800px",
      },
      {
        opacity: 1.0,
        top: "0px",
        duration: 4,
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );

    t1.fromTo(
      textRightRef.current,
      {
        opacity: 0,
        top: "800px",
      },
      {
        opacity: 1.0,
        top: "0px",
        duration: 4,
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );
  });

  return (
    <div className="third-section" ref={forwardedRef}>
      <div className="content">
        <h2 className="left-text" ref={textLeftRef}>
          Better Design
        </h2>
        <h2 className="right-text" ref={textRightRef}>
          Than Kayne West{" "}
          <span>
            <img src={EmojiHandMouth} alt="emoji" />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ThirdSection;
