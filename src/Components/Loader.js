import React from "react";
import { Html } from "@react-three/drei";
import { useProgress } from "@react-three/drei";

const Loader = ({ setAppIsLoaded, setLoadingPercentage }) => {
  const { loaded, total } = useProgress();
  return (
    <Html wrapperClass="loading-container">
      {setLoadingPercentage(Math.floor((loaded / total) * 100))}
      {setAppIsLoaded(loaded / total == 1)}
    </Html>
  );
};

export default Loader;
