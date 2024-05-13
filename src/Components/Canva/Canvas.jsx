import { Canvas, } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Environment} from "@react-three/drei/core/Environment";
import { Sparkles} from "@react-three/drei/core/Sparkles";

import { CineonToneMapping} from "three";

import Room from "./Model/Room";
import Effects from "./Effects";
import Lights from "./Lights/Lights";


const CanvasHome = () => {


    return (
      <>
    
        <Canvas
           shadows
           linear={true}
           dpr={2.5}
           camera={{ position: [0, 0.2, 2], near: 0.1, far: 100000, fov: 45 }}
           gl={{
             powerPreference: 'high-performance',
             alpha: false,
             antialias: true,
             stencil: false,
             depth: true,
             toneMapping: CineonToneMapping,
            //  toneMappingExposure: 1.5  // Adjust exposure to your liking
            }}
       
        >
            <Lights></Lights>
            <Effects></Effects>
            <group position={[0,0,0]}>  
              <Sparkles color="white" count={570} noise={[0.5, 0.5, 0.5]}  scale={[4,5]} size={1} speed={0.4} opacity={0.7}/>
              <Room></Room>
            </group>
            <Environment 
             backgroundBlurriness={0} 
             backgroundIntensity={1}   
              environmentRotation={[0, 0, 0]}
               preset="dawn" 
               environmentIntensity={0.3} 
               encoding={CineonToneMapping}
               ></Environment>
            <OrbitControls></OrbitControls>
         
        </Canvas>
      </>
    );
};

export default CanvasHome;
