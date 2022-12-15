import React from "react";
import {
  Noise,
  Vignette,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Effects = () => {
  return (
    <>
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.COLOR} />
        <ChromaticAberration
          blendFunction={BlendFunction.SOFT_LIGHT}
          offset={[0.0009, 0.0009]}
        />
        <Vignette offset={0.3} darkness={0.5} />
      </EffectComposer>
    </>
  );
};

export default Effects;
