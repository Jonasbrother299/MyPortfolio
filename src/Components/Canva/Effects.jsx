import React from "react";
import { EffectComposer, Bloom,Vignette  } from "@react-three/postprocessing";

export default function Effects() {

    return (
        <>
        <EffectComposer multisampling={0}>
        <Bloom intensity={0.4} luminanceThreshold={0.3}  luminanceSmoothing={0.15}/>
            <Vignette  offset={0.6} darkness={0.5} />
          </EffectComposer>
        </>
    )
}