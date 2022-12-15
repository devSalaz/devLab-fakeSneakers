import React, { useRef, useEffect } from "react";
import useGame from "../Stores/useGame";
import gsap from "gsap";
import { GiMusicSpell, GiSonicShoes, GiBasketballJersey } from "react-icons/gi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SecondSection = ({ forwardedRef, secondSectionRef }) => {
  const lightMode = useGame((state) => state.lightmode);
  const textRef = useRef(null);

  useEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      textRef.current,
      {
        opacity: 0,
        x: "150%",
      },
      {
        opacity: 1.0,
        x: "0%",
        duration: 4,
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="second-section" ref={forwardedRef}>
      <div className="content">
        <div className="right-content" ref={textRef}>
          <h4>Good sneakers and good music is all you need</h4>
          <ul>
            <li>
              <div className={`icon-container ${lightMode ? "dark" : ""}`}>
                <GiMusicSpell />
              </div>
              <div className="item-description">
                <h3>Bluetooth</h3>
                <p>Battery 6.1V</p>
              </div>
            </li>
            <li>
              <div className={`icon-container ${lightMode ? "dark" : ""}`}>
                <GiSonicShoes />
              </div>
              <div className="item-description">
                <h3>Speed</h3>
                <p>You will run 30km/h</p>
              </div>
            </li>
            <li>
              <div className={`icon-container ${lightMode ? "dark" : ""}`}>
                <GiBasketballJersey />
              </div>
              <div className="item-description">
                <h3>MVP</h3>
                <p>You are going to be the best in your team</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
