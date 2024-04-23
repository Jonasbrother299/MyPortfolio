import React, { useRef, useEffect } from 'react'
import { useControls } from 'leva'
import { SpotLight } from '@react-three/drei'
import { SpotLightHelper } from 'three'
import { useThree } from '@react-three/fiber'

function Lights() {
    const $spotLight = useRef()
    const $spotLightHelper = useRef()
  const $backLight = useRef()
  const { scene, gl } = useThree()
  const lightBias = -0.0001;
//   const {  color, penumbra,decay,positionX ,positionY,positionZ, angle,distance} = useControls({
//     color: {value: "#ffffff"},
//     penumbra: {value: 0.5},
//     decay: {value:2.8, min: 1, max: 4, step:0.1},
//     positionX:{value: -11,min: -170, max: 170, step:0.1},
//     positionY:{value: 11.6,min: -170, max: 170, step:0.1},
//     positionZ:{value: -17,min: -170, max: 170, step:0.1},
//      angle:{value: 1.31,min: 0, max: Math.PI / 2, step:0.01},
//      distance:{value: 500,min: 10, max: 500, step:1},
//   })
//   const { near, far } = useControls({
//     near: { value: 0.1, min: 0.1, max: 100, step: 0.1 },
//     far: { value: 100, min: 10, max: 500, step: 1 },
//   });
  useEffect(() => {
    if ($spotLight.current) {
      $spotLightHelper.current = new SpotLightHelper($spotLight.current)
      scene.add($spotLightHelper.current)
    }
    
    return () => {
      if ($spotLightHelper.current) {
        scene.remove($spotLightHelper.current)
      }
    }
  }, [scene])
 
  useEffect(() => {
    if ($spotLightHelper.current) {
      $spotLightHelper.current.update()
    }
  })

  return (
    <>
      {/* <SpotLight
        position={[positionX, positionY, positionZ]}
        color="white"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        distance={distance}
        angle={angle}
        decay={decay}
        penumbra={penumbra}
        castShadow
        shadow-bias={lightBias}
        intensity={4000}
        ref={$spotLight}
        shadow-camera-near={near}
        shadow-camera-far={far}
    
      />

      <pointLight color={color} position={[0, 1, -10]} intensity={0.3} />

      <spotLight ref={$backLight} position={[0, 1, 3]} intensity={0.4} distance={4} color="blue" /> */}
<directionalLight></directionalLight>
<ambientLight intensity={20}></ambientLight>
    </>
  )
}

export default Lights