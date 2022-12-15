import React, { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

import FakeSneakerRedLogo from "../assets/logos/fake-sneaker-red-logo.png";
import FakeSneakerPurpleLogo from "../assets/logos/fake-sneaker-purple-logo.png";
import useGame from "../Stores/useGame";

import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaGithubSquare,
  FaLinkedin,
  FaArtstation,
} from "react-icons/fa";
import { SiSketchfab } from "react-icons/si";
import { useState } from "react";

const Footer = ({ canvasRef }) => {
  const footerRef = useRef(null);
  const lightMode = useGame((state) => state.lightmode);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const scrollY = window.scrollY + window.innerHeight;
      const footerValue =
        footerRef.current.offsetHeight + footerRef.current.offsetTop;
      const footerHeight = footerRef.current.getBoundingClientRect().height;
      const referenceValue = scrollY - footerValue + footerHeight;
      if (referenceValue >= 0) {
        canvasRef.current.style.transform = `translateY(-${referenceValue}px)`;
      } else {
        canvasRef.current.style.transform = `translateY(${0}px)`;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-content">
        <div className="logo-navbar">
          <img src={FakeSneakerRedLogo} alt="logo" />
          <img
            className={`purpleLogo ${lightMode ? "" : "active"}`}
            src={FakeSneakerPurpleLogo}
            alt="logo"
          />
        </div>
        <div className="footer-media-container">
          <h4>Follow me</h4>
          <ul>
            <li className={lightMode ? "" : "darkMode"}>
              <a href="https://twitter.com/DevSalaz" target="_blank">
                <FaTwitterSquare />
              </a>
            </li>
            <li className={lightMode ? "" : "darkMode"}>
              <a href="https://www.instagram.com/el.salaz/" target="_blank">
                <FaInstagramSquare />
              </a>
            </li>
            <li className={lightMode ? "" : "darkMode"}>
              <a
                href="https://www.linkedin.com/in/andres-salaz/"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </li>
            <li className={lightMode ? "" : "darkMode"}>
              <a href="https://github.com/devSalaz" target="_blank">
                <FaGithubSquare />
              </a>
            </li>
            <li className={lightMode ? "" : "darkMode"}>
              <a href="https://www.artstation.com/elsalaz" target="_blank">
                <FaArtstation />
              </a>
            </li>
            <li className={lightMode ? "" : "darkMode"}>
              <a href="https://sketchfab.com/andressalazar264" target="_blank">
                <SiSketchfab />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
