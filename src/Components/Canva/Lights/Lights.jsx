import React, { useRef } from 'react';
import { useControls } from 'leva';

function Lights() {
  const $dirLight = useRef();

  const { color, intensity, positionX, positionY, positionZ } = useControls({
    color: { value: "#ffffff" }, 
    intensity: { value: 0.6, min: 0, max: 2, step: 0.1 },
    positionX: { value: 0, min: -100, max: 100, step: 1 },
    positionY: { value: 50, min: 0, max: 100, step: 1 },  
    positionZ: { value: 50, min: -100, max: 100, step: 1 },
  });

  return (
    <>
      <directionalLight
        ref={$dirLight}
        color={color}
        intensity={intensity}
        position={[positionX, positionY, positionZ]}
        castShadow={true}
      />
     <ambientLight intensity={0.5}></ambientLight>
    </>
  )
}

export default Lights