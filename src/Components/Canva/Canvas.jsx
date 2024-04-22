import { Suspense, useState, useEffect,  } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Environment, OrbitControls } from "@react-three/drei";
import { CineonToneMapping } from "three";
import Room from "./Model/Room";
import Effects from "./Effects";
import Lights from "./Lights/Lights";

const CameraAnimator = () => {
    const { camera } = useThree();
    const [startMoving, setStartMoving] = useState(false);
    const targetZ = 10; // Define how far you want the camera to move
    const speed = 0.02; // Speed of movement

    useEffect(() => {
        // Start the camera movement after 5 seconds
        const timer = setTimeout(() => {
            setStartMoving(true);
        }, 1000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timer);
    }, []);

    useFrame(() => {
        if (startMoving && camera.position.z > targetZ) {
            // Move the camera forward (decreasing z)
            camera.position.z -= speed;
        }
    });

    return null; // This component does not render anything itself
};

const CanvasHome = () => {
    

    return (
      <>
        <Canvas
           shadows
           linear={true}
           dpr={2.5}
           camera={{ position: [0, 0.3, 50], far: 1000, fov: 45 }}
           gl={{
             powerPreference: 'high-performance',
             alpha: false,
             antialias: false,
             stencil: false,
             depth: true,
           }}
       
        >
          <mesh position={[-5,0,32]} rotation={[0,1.6,0]}>
            <planeGeometry args={[20,6]} ></planeGeometry>
          <meshBasicMaterial color="#f8eccd"></meshBasicMaterial>
          </mesh>
            <CameraAnimator />
            <Lights></Lights>
            <Effects></Effects>
            <Environment preset="warehouse" environmentIntensity={0.01}></Environment>
            <OrbitControls></OrbitControls>
          <Room></Room>
        </Canvas>
      </>
    );
};

export default CanvasHome;
