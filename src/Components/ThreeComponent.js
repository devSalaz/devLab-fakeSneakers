import React, { useEffect } from "react";
import PlaneBackground from "./PlaneBackground";
import PlaneDraw from "./PlaneDraw";
import Sneaker from "./Sneaker";
import Lighting from "./Lighting";
import Effects from "./Effects";

const ThreeComponent = ({
  firstSectionRef,
  secondSectionRef,
  thirdSectionRef,
  editSectionRef,
}) => {
  return (
    <>
      <PlaneBackground />
      <Lighting />
      <Effects />
      <Sneaker
        firstSectionRef={firstSectionRef}
        secondSectionRef={secondSectionRef}
        thirdSectionRef={thirdSectionRef}
        editSectionRef={editSectionRef}
      />
      <PlaneDraw
        firstSectionRef={firstSectionRef}
        secondSectionRef={secondSectionRef}
        thirdSectionRef={thirdSectionRef}
        editSectionRef={editSectionRef}
      />
    </>
  );
};

export default ThreeComponent;
