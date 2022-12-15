import React from "react";
import ThreeComponent from "./ThreeComponent";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";

const CanvasComponent = ({
  forwardedRef,
  firstSectionRef,
  secondSectionRef,
  thirdSectionRef,
  editSectionRef,
  setAppIsLoaded,
  setLoadingPercentage,
}) => {
  return (
    <div className="canvasContainer">
      <Canvas shadows ref={forwardedRef}>
        <ThreeComponent
          firstSectionRef={firstSectionRef}
          secondSectionRef={secondSectionRef}
          thirdSectionRef={thirdSectionRef}
          editSectionRef={editSectionRef}
        />
        <Loader
          setAppIsLoaded={setAppIsLoaded}
          setLoadingPercentage={setLoadingPercentage}
        />
      </Canvas>
    </div>
  );
};

export default CanvasComponent;
