import React, { useEffect, useRef, useState } from "react";
import {
  useGLTF,
  Float,
  ContactShadows,
  PresentationControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGame from "../Stores/useGame";
import { useTexture } from "@react-three/drei";
import WhiteTexture from "../assets/textures/whiteSquare.png";

gsap.registerPlugin(ScrollTrigger);

const Sneaker = ({ secondSectionRef, thirdSectionRef, editSectionRef }) => {
  const editmode = useGame((state) => state.editmode);
  const lightMode = useGame((state) => state.lightmode);
  const isColorSelected = useGame((state) => state.colorIsSelected);
  const sneakerRef = useRef(null);
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [secondaryColor, setSecondaryColor] = useState("#4c2a79");
  const [thirdColor, setThirdColor] = useState("#252525");
  const [lacesColor, setLacesColor] = useState("#252525");
  const { nodes, materials } = useGLTF("./models/sneaker.glb");
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [currentSelector, setCurrentSelector] = useState("primary");
  const [currentHelper, setCurrentHelper] = useState(0);

  //Setup materials
  const materialPrimary = materials.Main.clone();
  materialPrimary.color = new THREE.Color(0xffffff);
  const materialSecondary = materials.Main.clone();
  materialSecondary.color = new THREE.Color(0x4c2a79);
  const materialThird = materials.Main.clone();
  materialThird.color = new THREE.Color(0x252525);
  const materialLaces = materials.Main.clone();
  materialLaces.color = new THREE.Color(0x252525);

  //Setup Main Color
  const colorPurple = new THREE.Color(0x4c2a79);
  const colorBlack = new THREE.Color(0x00000);

  useEffect(() => {
    if (currentSelector == "primary") {
      setPrimaryColor(currentColor);
    } else if (currentSelector == "secondary") {
      setSecondaryColor(currentColor);
    } else if (currentSelector == "third") {
      setThirdColor(currentColor);
    } else {
      setLacesColor(currentColor);
    }
  }, [currentHelper]);

  useEffect(() => {
    setupAnimations();

    const unsuscribeEditMode = useGame.subscribe(
      (state) => state.editmode,
      (value) => {
        gsap.to(sneakerRef.current.parent.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.0,
          ease: Power3.easeOut,
        });
      }
    );

    const unsuscribeCurrentSelector = useGame.subscribe(
      (state) => state.sneakerSelector,
      (value) => {
        setCurrentSelector(value);
      }
    );

    const unsuscribeCurrentColor = useGame.subscribe(
      (state) => state.currentColor,
      (value) => {
        setCurrentColor(value);
      }
    );

    const unsuscribeHelper = useGame.subscribe(
      (state) => state.helper,
      (value) => {
        setCurrentHelper(value);
      }
    );

    return () => {
      unsuscribeEditMode();
      unsuscribeCurrentSelector();
      unsuscribeCurrentColor();
      unsuscribeHelper();
    };
  }, []);

  useFrame(() => {
    sneakerRef.current.parent.position.set(0, 0, -1);

    //LightMode Change
    if (!isColorSelected) {
      const currentColor = !lightMode ? colorPurple : colorBlack;
      materialSecondary.color.lerp(currentColor, 0.05);
    } else {
      materialSecondary.color.set(secondaryColor);
    }
    materialPrimary.color.set(primaryColor);
    materialThird.color.set(thirdColor);
    materialLaces.color.set(lacesColor);
  });

  const setupAnimations = () => {
    const t1 = gsap.timeline();

    //First section
    t1.fromTo(
      sneakerRef.current.position,
      {
        x: 3,
        y: 0,
        z: 0 + 1,
      },
      {
        x: -4,
        y: 0.2,
        z: -1.2 + 1,
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
      sneakerRef.current.rotation,
      {
        x: 0,
        y: -0.2,
        z: -0.1,
      },
      {
        x: 0,
        y: 2.8,
        z: -0.1,
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
      sneakerRef.current.position,
      {
        x: -4,
        y: 0.2,
        z: -1.2 + 1.0,
      },
      {
        x: 0,
        y: -1.5,
        z: -0.8 + 1.0,
        duration: 4,
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    t1.fromTo(
      sneakerRef.current.rotation,
      {
        x: 0,
        y: 2.8,
        z: -0.1,
      },
      {
        x: 4.8,
        y: 1.5,
        z: -0.1,
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
      sneakerRef.current.position,
      {
        x: 0,
        y: -1,
        z: -0.8 + 1.0,
      },
      {
        x: 0.75,
        y: 0,
        z: -1 + 1.0,
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
      sneakerRef.current.rotation,
      {
        x: 4.8,
        y: 1.5,
        z: -0.1,
      },
      {
        x: 0.0,
        y: -0.2,
        z: -0.1,
        duration: 4,
        scrollTrigger: {
          trigger: editSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    //Init position
    sneakerRef.current.position.set(3.2, 0, 0 + 1);
    sneakerRef.current.rotation.set(0, -0.2, -0.1);
  };

  return (
    <>
      <PresentationControls enabled={editmode} global={true}>
        <group
          layers={2}
          ref={sneakerRef}
          scale={1.15}
          position={[3.2, 0, 0]}
          rotation={[0, -0.2, -0.1]}
        >
          <Float floatIntensity={0.2}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.PrimaryColorMat.geometry}
              material={materialPrimary}
              material-map={useTexture(WhiteTexture)}
            ></mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SoleMaterial.geometry}
              material={materialSecondary}
              material-map={useTexture(WhiteTexture)}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ThirdColorMat.geometry}
              material={materialThird}
              material-map={useTexture(WhiteTexture)}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SecondaryColorMat.geometry}
              material={materialSecondary}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.NikeCheckMat.geometry}
              material={materialThird}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.BottomBodyMat.geometry}
              material={materialPrimary}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.LacesMat.geometry}
              material={materialLaces}
              material-map={useTexture(WhiteTexture)}
            />
          </Float>
        </group>
      </PresentationControls>

      <ContactShadows
        position={[0, -3.2, 0]}
        opacity={0.5}
        scale={20}
        blur={1.5}
      />
    </>
  );
};

useGLTF.preload("./models/sneaker.glb");
export default Sneaker;
