import React, { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import VertexShader from "../assets/Shaders/DrawPlane/VertexShader";
import FragmentShader from "../assets/Shaders/DrawPlane/FragmentShader";
import * as THREE from "three";
import useGame from "../Stores/useGame";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PlaneDraw = ({ secondSectionRef, thirdSectionRef, editSectionRef }) => {
  const isLightMode = useGame((state) => state.lightmode);
  const planeDrawMatRef = useRef(null);

  const DrawMaterial = shaderMaterial(
    {
      uValue: 0.0,
      uTime: 0,
      uValueInversed: 0,
      uValueRadius: 1.0,
      uOffsetX: 0,
      uOffsetY: 0,
      uColor: 0,
      uHelper: 0,
      uColorValue1: new THREE.Color(0xffd524),
      uColorValue2: new THREE.Color(0x23bfac),
    },
    VertexShader,
    FragmentShader
  );

  extend({ DrawMaterial });

  useFrame((state, delta) => {
    const uValueColor = isLightMode ? 0.0 : 1.0;

    planeDrawMatRef.current.uColor = THREE.MathUtils.lerp(
      planeDrawMatRef.current.uniforms.uColor.value,
      uValueColor,
      0.025
    );
    planeDrawMatRef.current.uTime = state.clock.elapsedTime;
    planeDrawMatRef.current.uOffsetX = THREE.MathUtils.lerp(
      planeDrawMatRef.current.uniforms.uOffsetX.value,
      -state.mouse.x,
      0.075
    );
    planeDrawMatRef.current.uOffsetY = THREE.MathUtils.lerp(
      planeDrawMatRef.current.uniforms.uOffsetY.value,
      -state.mouse.y,
      0.075
    );
  });

  useEffect(() => {
    setupAnimation();
  }, []);

  const setupAnimation = () => {
    const t1 = gsap.timeline();

    //First section
    t1.fromTo(
      planeDrawMatRef.current,
      {
        uValue: 0,
      },
      {
        uValue: 1,
        duration: 4,
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    t1.fromTo(
      planeDrawMatRef.current,
      {
        uValueRadius: 1.0,
      },
      {
        uValueRadius: 0.0,
        duration: 4,
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    //Second Section

    t1.fromTo(
      planeDrawMatRef.current,
      {
        uHelper: 0,
      },
      {
        uHelper: 1.0,
        duration: 4,
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    //Third Section

    t1.fromTo(
      planeDrawMatRef.current,
      {
        uHelper: 1.0,
      },
      {
        uHelper: 0.0,
        duration: 4,
        scrollTrigger: {
          trigger: editSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    t1.fromTo(
      planeDrawMatRef.current,
      {
        uValueRadius: 0.0,
      },
      {
        uValueRadius: 1.0,
        duration: 4,
        scrollTrigger: {
          trigger: editSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    t1.fromTo(
      planeDrawMatRef.current,
      {
        uValue: 1.0,
      },
      {
        uValue: 0.0,
        duration: 4,
        scrollTrigger: {
          trigger: editSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    //Init values
    planeDrawMatRef.current.uValue = 0.0;
    planeDrawMatRef.current.uValueRadius = 1.0;
    planeDrawMatRef.current.uHelper = 0.0;
  };

  return (
    <>
      <mesh position-z={-5} scale={14}>
        <planeGeometry />
        <drawMaterial ref={planeDrawMatRef} transparent />
      </mesh>
    </>
  );
};

export default PlaneDraw;
