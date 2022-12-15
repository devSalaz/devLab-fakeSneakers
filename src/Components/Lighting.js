import React, { useEffect, useRef } from "react";
import { Environment } from "@react-three/drei";
import { subscribeWithSelector } from "zustand/middleware";
import useGame from "../Stores/useGame";
import gsap from "gsap";
import * as THREE from "three";

const Lighting = () => {
  const ambientLightRef = useRef(null);

  useEffect(() => {
    const unsuscribeLightMode = useGame.subscribe(
      (state) => state.lightmode,
      (value) => {
        lightModeHandler(value);
      }
    );

    return () => {
      unsuscribeLightMode();
    };
  }, []);

  const lightModeHandler = (lightMode) => {
    const lightColor = new THREE.Color(0xe14050);
    const darkColor = new THREE.Color(0x3a2ead);
    gsap.to(ambientLightRef.current.color, {
      r: lightMode ? lightColor.r : darkColor.r,
      g: lightMode ? lightColor.g : darkColor.g,
      b: lightMode ? lightColor.b : darkColor.b,
    });
  };

  return (
    <>
      <Environment preset="city" />
      <ambientLight ref={ambientLightRef} color={"#1900ff"} intensity={1.5} />
      <directionalLight
        position={[-30, 5, 0]}
        color={"#c200ff"}
        intensity={1.0}
      />
      <spotLight position={[10, 7, 2]} color={"#ff6000"} intensity={3.0} />
    </>
  );
};

export default Lighting;
