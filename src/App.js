import { useRef, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import FirstSections from "./Components/FirstSections";
import SecondSection from "./Components/SecondSection";
import ThirdSection from "./Components/ThirdSection";
import EditSection from "./Components/EditSection";
import CanvasComponent from "./Components/CanvasComponent";
import Footer from "./Components/Footer";
import useGame from "./Stores/useGame";
import gsap from "gsap";

import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const lightMode = useGame((state) => state.lightmode);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const editSectionRef = useRef(null);
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const unsuscribeLightMode = useGame.subscribe(
      (state) => state.editmode,
      (value) => {
        editModeHandler(value);
      }
    );

    return () => {
      unsuscribeLightMode();
    };
  }, []);

  const editModeHandler = (editmode) => {
    const bodyElement = document.body;

    editSectionRef.current.scrollIntoView({ behaviour: "smoth" });

    if (editmode) {
      bodyElement.style.overflowY = "hidden";
    } else {
      bodyElement.style.overflowY = "auto";
    }
  };

  return (
    <div className={`App ${lightMode ? "" : "dark"}`}>
      <div className={`loader-content ${appIsLoaded ? "loaded" : ""}`}>
        <h2>Loading {loadingPercentage}%</h2>
      </div>
      <CanvasComponent
        forwardedRef={canvasRef}
        firstSectionRef={firstSectionRef}
        secondSectionRef={secondSectionRef}
        thirdSectionRef={thirdSectionRef}
        editSectionRef={editSectionRef}
        setAppIsLoaded={setAppIsLoaded}
        setLoadingPercentage={setLoadingPercentage}
      />
      <Navbar />
      <FirstSections forwardedRef={firstSectionRef} />
      <SecondSection
        forwardedRef={secondSectionRef}
        secondSectionRef={secondSectionRef}
      />
      <ThirdSection
        forwardedRef={thirdSectionRef}
        thirdSectionRef={thirdSectionRef}
      />
      <EditSection
        forwardedRef={editSectionRef}
        editSectionRef={editSectionRef}
      />
      <Footer canvasRef={canvasRef} />
    </div>
  );
}

export default App;
