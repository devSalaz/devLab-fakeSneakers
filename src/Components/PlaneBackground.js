import React, { useRef } from "react";
import FragmentShader from "../assets/Shaders/BackgroundPlane/FragmentShader";
import VertexShader from "../assets/Shaders/BackgroundPlane/VertexShader";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import useGame from "../Stores/useGame";

const PlaneBackground = () => {
  const BackgroundMaterial = shaderMaterial(
    {
      uValue: 1,
      uColorValue1: new THREE.Color(0x3a2ead),
      uColorValue2: new THREE.Color(0xe14050),
    },
    VertexShader,
    FragmentShader
  );

  extend({ BackgroundMaterial });

  const { camera, viewport } = useThree();
  const isLightMode = useGame((state) => state.lightmode);
  const planeBackgroundRef = useRef(null);
  const backgroundMaterialRef = useRef(null);

  useFrame(() => {
    const { width, height } = viewport.getCurrentViewport(camera, [
      planeBackgroundRef.current.position.x,
      planeBackgroundRef.current.position.y,
      planeBackgroundRef.current.position.z,
    ]);

    planeBackgroundRef.current.scale.set(width, height, 1);

    const valueToLerp = isLightMode ? 1 : -0.3;
    const currentValue = backgroundMaterialRef.current.uniforms.uValue.value;
    backgroundMaterialRef.current.uValue = THREE.MathUtils.lerp(
      currentValue,
      valueToLerp,
      0.1
    );
  });

  return (
    <>
      <mesh position-z={-10} ref={planeBackgroundRef}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <backgroundMaterial ref={backgroundMaterialRef} transparent />
      </mesh>
    </>
  );
};

export default PlaneBackground;
