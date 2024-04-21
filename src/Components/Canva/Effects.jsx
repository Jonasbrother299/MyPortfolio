import React, { Suspense,useState, forwardRef,useEffect  } from "react";
import { Circle } from '@react-three/drei'
import { EffectComposer, GodRays, Bloom,Vignette  } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from 'leva'

const Sun = forwardRef((props, ref) => {
    const { sunColor, positionX, positionY, positionZ, RotationX, RotationY, RotationZ } = useControls({
      sunColor: { value: '#ffffff', label: 'Sun Color' },
      positionX: { value: -22, min: -50, max: 50, step: 1, label: 'Position X' },
      positionY: { value: 21, min: -50, max: 50, step: 1, label: 'Position Y' },
      positionZ: { value: 7, min: -50, max: 50, step: 1, label: 'Position Z' },
      RotationX: { value: -1.59, min: -5, max: 5, step: 0.01, label: 'Rotation X' },
      RotationY: { value: 2.76, min: -5, max: 5, step: 0.01, label: 'Rotation Y' },
      RotationZ: { value: -0.06, min: -5, max: 5, step: 0.01, label: 'Rotation Z' }
    });
  
    return (
      <Circle args={[65, 65]} ref={ref} position={[positionX, positionY, positionZ]} {...props} rotation={[RotationX, RotationY, RotationZ]}>
        <meshBasicMaterial color={sunColor} />
      </Circle>
    );
  });
  

export default function Effects() {

    const [sunMesh, setSunMesh] = useState();
  
    const { exposure, decay, blur } = useControls('PostProcessing - GodRays', {
      exposure: {
        value: 1,
        min: 0,
        max: 1,
      },
      decay: {
        value: 0.9,
        min: 0,
        max: 1,
        step: 0.1,
      },
      blur: {
        value: true,
      },
    })
    useEffect(() => {
        if (sunMesh) {
          console.log('Sun mesh is set:', sunMesh);

          
        }
      }, [sunMesh]);

    return (
<>
        <Sun ref={setSunMesh} />
  
        {sunMesh  && (
          <EffectComposer multisampling={0}>
            <GodRays 
            sun={sunMesh} 
            exposure={exposure} 
            decay={decay} 
            blur={blur} 
            samples={260} // The number of samples per pixel.
            density={1.0}
    />
        <Bloom intensity={14.0} luminanceThreshold={0.8}  luminanceSmoothing={5.15}/>
            <Vignette  offset={0.5} // vignette offset
    darkness={0.5} />
          </EffectComposer>
        )}
        </>
    )
}