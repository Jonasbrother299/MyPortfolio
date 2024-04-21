
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/room4.glb')
  return (
    <group {...props} dispose={null} position={[27, -4, 35]} rotation={[0, 1.6, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.Material}
        position={[-5.479, -6.93, 53.353]}
        scale={[2.996, 2.996, 3.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.002']}
        position={[-5.479, -6.93, 53.353]}
        scale={[2.996, 2.996, 3.031]}
      />
    </group>
  )
}

useGLTF.preload('/room3.glb')