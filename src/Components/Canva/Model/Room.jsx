import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { MeshReflectorMaterial } from '@react-three/drei/core/MeshReflectorMaterial';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';


export default function Model(props) {
  const { nodes, materials } = useGLTF('/room1236.glb');
  const originalProperties = useRef({});

  const normalMap = useLoader(TextureLoader, 'TilesSlateSquare001_NRM_4K_METALNESS.png');

  useEffect(() => {
    materials['Material.007'].roughness = 0;
    materials['Material.007'].metalness = 0;

    // Store original emissive colors and intensities when the component mounts
    originalProperties.current['Material.008'] = {
      emissive: materials['Material.008'].emissive.clone(),
      emissiveIntensity: materials['Material.008'].emissiveIntensity,
    };
    originalProperties.current['Material.004'] = {
      emissive: materials['Material.004'].emissive.clone(),
      emissiveIntensity: materials['Material.004'].emissiveIntensity,
    };
    originalProperties.current['Material.002'] = {
      emissive: materials['Material.002'].emissive.clone(),
      emissiveIntensity: materials['Material.002'].emissiveIntensity,
    };
  }, [materials]);

  const handlePointerOver = useCallback((pillarName) => {
    switch (pillarName) {
      case 'Pillar_4':
        materials['Material.008'].emissive.set(0xE67E00); // Change LightBox_5 emissive color to red
        materials['Material.008'].emissiveIntensity = 4;
        materials['Material.008'].toneMapped = true;
        materials['Material.008'].needsUpdate = true;
        break;
      case 'Pillar_3':
        materials['Material.004'].emissive.set(0xE67E00); // Change LightBox_4 emissive color to blue
        materials['Material.004'].emissiveIntensity = 4;
        materials['Material.004'].toneMapped = true;
        materials['Material.004'].needsUpdate = true;
        break;
      case 'Pillar_5':
        materials['Material.002'].emissive.set(0xE67E00); // Change LightBox_3 emissive color to green
        materials['Material.002'].emissiveIntensity = 4;
        materials['Material.002'].toneMapped = true;
        materials['Material.002'].needsUpdate = true;
        break;
      default:
        break;
    }
  }, [materials]);

  const handlePointerOut = useCallback((pillarName) => {
    switch (pillarName) {
      case 'Pillar_4':
        materials['Material.008'].emissive.copy(originalProperties.current['Material.008'].emissive); // Reset LightBox_5 emissive color
        materials['Material.008'].emissiveIntensity = originalProperties.current['Material.008'].emissiveIntensity;
        materials['Material.008'].toneMapped = true;
        materials['Material.008'].needsUpdate = true;
        break;
      case 'Pillar_3':
        materials['Material.004'].emissive.copy(originalProperties.current['Material.004'].emissive); // Reset LightBox_4 emissive color
        materials['Material.004'].emissiveIntensity = originalProperties.current['Material.004'].emissiveIntensity;
        materials['Material.004'].toneMapped = true;
        materials['Material.004'].needsUpdate = true;
        break;
      case 'Pillar_5':
        materials['Material.002'].emissive.copy(originalProperties.current['Material.002'].emissive); // Reset LightBox_3 emissive color
        materials['Material.002'].emissiveIntensity = originalProperties.current['Material.002'].emissiveIntensity;
        materials['Material.002'].toneMapped = true;
        materials['Material.002'].needsUpdate = true;
        break;
      default:
        break;
    }
  }, [materials]);

  const pillars = useMemo(() => ['Pillar_5', 'Pillar_4', 'Pillar_3'], []);

  return (
    <group {...props} dispose={null} position={[-21.7, -3, 16.5]} rotation={[0, 0, 0]}>
      <group name="Scene">
        {pillars.map(pillarName => (
          <mesh
            key={pillarName}
            onPointerOver={() => handlePointerOver(pillarName)}
            onPointerOut={() => handlePointerOut(pillarName)}
            castShadow
            receiveShadow
            geometry={nodes[pillarName].geometry}
            material={materials['Material.005']}
            position={nodes[pillarName].position}
            scale={[0.102, 0.052, 0.102]}
          />
        ))}
        <group position={[15.698, 1.275, -0.745]} scale={[0.526, 0.526, 0.532]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials['Material.006']}
          >
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={512} // Lower the resolution for better performance
              mixBlur={1}
              mixStrength={20}
              roughness={0}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#555505"
              metalness={0.4}
              map={materials['Material.007'].map}
              reflectorOffset={0.9}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
          >
            <MeshReflectorMaterial
              blur={[600, 100]}
              resolution={512} // Lower the resolution for better performance
              mixBlur={4}
              mixStrength={20}
              roughness={0.8}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#333300"
              metalness={1.5}
              map={materials['Material.009'].map}
              normalMap={normalMap}
              reflectorOffset={0.9}
            />
          </mesh>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightBox_1.geometry}
          material={materials['Material.002']}
          position={[20.428, 3.406, -17.78]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.176}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightBox_4.geometry}
          material={materials['Material.011']}
          position={[20.428, 3.406, -18.78]}
          rotation={[0, Math.PI / 2, 0]}
          scale={2.176}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightBox_4.geometry}
          material={materials['Material.008']}
          position={[20.428, 3.406, -17.78]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.176}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightBox_5.geometry}
          material={materials['Material.004']}
          position={[20.428, 3.406, -17.78]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.176}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ground.geometry}
          position={[22.015, 3.857, -19.932]}
        >
          <MeshReflectorMaterial
            blur={[300, 300]}
            resolution={512} // Lower the resolution for better performance
            mixBlur={99999999}
            mixStrength={5}
            roughness={0.9}
            depthScale={1.2}
            minDepthThreshold={0.1}
            maxDepthThreshold={1.4}
            color="#55550A"
            metalness={0.77}
            envMap={null} // Explicitly set environment map to null
            envMapIntensity={0.2}
            map={materials['Material.007'].map} // Assuming there's an existing texture map
            reflectorOffset={0.4}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials['Material.011']}
          position={[23.717, 4.082, -16.222]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/room1236.glb');
