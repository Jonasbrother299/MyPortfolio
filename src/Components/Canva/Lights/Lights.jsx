import React, { useRef, useMemo } from 'react';
import { useControls } from 'leva';

const Lights = React.memo(() => {
  const $dirLight = useRef();

  const { color, intensity, positionX, positionY, positionZ } = useControls({
    color: { value: "#ffffff" }, 
    intensity: { value: 0.6, min: 0, max: 2, step: 0.1 },
    positionX: { value: 0, min: -100, max: 100, step: 1 },
    positionY: { value: 50, min: 0, max: 100, step: 1 },  
    positionZ: { value: 50, min: -100, max: 100, step: 1 },
  });

  // Memoize the light parameters to prevent unnecessary re-renders
  const lightProps = useMemo(() => ({
    color,
    intensity,
    position: [positionX, positionY, positionZ],
  }), [color, intensity, positionX, positionY, positionZ]);

  return (
    <>
      <directionalLight
        ref={$dirLight}
        {...lightProps}
        castShadow={true}
      />
      <ambientLight intensity={0.5} />
    </>
  );
});

export default Lights;