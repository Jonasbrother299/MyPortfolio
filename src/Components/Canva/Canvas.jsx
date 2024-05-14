import React, { Suspense, lazy, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Environment } from "@react-three/drei/core/Environment";
import { Sparkles } from "@react-three/drei/core/Sparkles";
import { CineonToneMapping } from "three";
import Effects from "./Effects";
import Lights from "./Lights/Lights";

const Room = lazy(() => import("./Model/Room"));

const CanvasHome = () => {
  // Memoized configuration to avoid unnecessary re-renders
  const cameraConfig = useMemo(() => ({
    position: [0, 0.2, 2],
    near: 0.1,
    far: 1000,
    fov: 45
  }), []);

  const glConfig = useMemo(() => ({
    powerPreference: 'high-performance',
    alpha: false,
    antialias: true,
    stencil: false,
    depth: true,
    toneMapping: CineonToneMapping,
  }), []);

  return (
    <Canvas
      shadows
      linear={true}
      dpr={Math.min(window.devicePixelRatio, 1)} // Reduce dpr for better performance
      camera={cameraConfig}
      gl={glConfig}
    >
      <Suspense fallback={<></>}>
        <Lights />
        <Effects />
        <group position={[0, 0, 0]}>
          <Sparkles color="white" position={[0, 0.5, 0]} count={40} noise={[0.5, 0.5, 0.5]} scale={[3, 1, 2]} size={1} speed={0.4} opacity={0.6} />
          <Room />
        </group>
        <Environment
          backgroundBlurriness={0}
          backgroundIntensity={1}
          environmentRotation={[0, 0, 0]}
          preset="dawn"
          environmentIntensity={0.3}
          encoding={CineonToneMapping}
        />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default CanvasHome;
