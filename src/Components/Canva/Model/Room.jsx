
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/room7.glb')
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
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.001']}
        position={[45.514, 1.768, -29.408]}
        scale={[0.66, 1, 0.66]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.001']}
        position={[45.514, 1.768, -25.318]}
        scale={[0.66, 1, 0.66]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Material.003']}
        position={[49.752, 5.211, -30.058]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials['Material.001']}
        position={[21.933, 1.768, -41.982]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.66, 1, 0.66]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials['Material.001']}
        position={[28.804, 1.768, -41.982]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.66, 1, 0.66]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials['Material.001']}
        position={[35.486, 1.768, -41.982]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.66, 1, 0.66]}
      />
      <group position={[21.464, 5.211, -43.68]} rotation={[0, Math.PI / 2, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials['Material.004']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials['Material.003']}
        position={[21.464, 5.211, -11.851]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.004']}
        position={[-5.479, -6.93, 53.353]}
        scale={[2.996, 2.996, 3.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['Material.005']}
        position={[-5.479, -6.93, 53.353]}
        scale={[2.996, 2.996, 3.031]}
      />
      <group position={[21.464, 5.211, -43.68]} rotation={[0, Math.PI / 2, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials['Material.004']}
        />
      </group>
      <group position={[21.464, 5.211, -43.68]} rotation={[0, Math.PI / 2, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials['Material.003']}
        >
           <meshBasicMaterial
              color={[1,0.3,0]}
          >
  </meshBasicMaterial>
          </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005_1.geometry}
          material={materials['Material.004']}
        />
      </group>
      </group>
  )
}

useGLTF.preload('/room7.glb')