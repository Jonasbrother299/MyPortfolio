import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { Html}from "@react-three/drei/web/Html"
import { MeshReflectorMaterial } from '@react-three/drei/core/MeshReflectorMaterial';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Importiere THREE
import { TextureLoader } from 'three';
import '../../../stylesheet/ProjectGallery.css'; // Import the CSS file

export default function Model({ clickedItem, setClickedItem, setCloseVisible, props }) {
  const { nodes, materials } = useGLTF('/room1236.glb');
  const originalProperties = useRef({});
  const { camera } = useThree();
  const [clickedPillars, setClickedPillars] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const targetPosition = useRef(null);
  const lookAtPosition = useRef(null);
  const originalPosition = useRef(camera.position.clone());
  const originalLookAt = useRef(new THREE.Vector3(0, 0, 0)); // Ursprüngliche Blickrichtung
  const normalMap = useLoader(TextureLoader, 'TilesSlateSquare001_NRM_4K_METALNESS.png');

  useEffect(() => {
    materials['Material.007'].roughness = 0;
    materials['Material.007'].metalness = 0;

    // Speichere die ursprünglichen Emissionsfarben und -intensitäten beim Mounten der Komponente
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
        materials['Material.008'].emissive.set(0xE67E00); // Ändere Emissionsfarbe zu Orange
        materials['Material.008'].emissiveIntensity = 8;
        materials['Material.008'].toneMapped = true;
        materials['Material.008'].needsUpdate = true;
        break;
      case 'Pillar_3':
        materials['Material.004'].emissive.set(0xE67E00); // Ändere Emissionsfarbe zu Orange
        materials['Material.004'].emissiveIntensity = 8;
        materials['Material.004'].toneMapped = true;
        materials['Material.004'].needsUpdate = true;
        break;
      case 'Pillar_5':
        materials['Material.002'].emissive.set(0xE67E00); // Ändere Emissionsfarbe zu Orange
        materials['Material.002'].emissiveIntensity = 8;
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
        materials['Material.008'].emissive.copy(originalProperties.current['Material.008'].emissive); // Setze Emissionsfarbe zurück
        materials['Material.008'].emissiveIntensity = originalProperties.current['Material.008'].emissiveIntensity;
        materials['Material.008'].toneMapped = true;
        materials['Material.008'].needsUpdate = true;
        break;
      case 'Pillar_3':
        materials['Material.004'].emissive.copy(originalProperties.current['Material.004'].emissive); // Setze Emissionsfarbe zurück
        materials['Material.004'].emissiveIntensity = originalProperties.current['Material.004'].emissiveIntensity;
        materials['Material.004'].toneMapped = true;
        materials['Material.004'].needsUpdate = true;
        break;
      case 'Pillar_5':
        materials['Material.002'].emissive.copy(originalProperties.current['Material.002'].emissive); // Setze Emissionsfarbe zurück
        materials['Material.002'].emissiveIntensity = originalProperties.current['Material.002'].emissiveIntensity;
        materials['Material.002'].toneMapped = true;
        materials['Material.002'].needsUpdate = true;
        break;
      default:
        break;
    }
  }, [materials]);

  const handlePillarClick = useCallback((pillarName) => {
    if (clickedPillars[pillarName]) return; // Falls Pfeiler bereits angeklickt, nichts tun
    setClickedPillars((prev) => ({ ...prev, [pillarName]: true }));
    setClickedItem(pillarName);
    setIsVisible(true);

    const forward = new THREE.Vector3(0, 0, -1); // Vorwärtsrichtung
    const right = new THREE.Vector3(0.5, 0, 0); // Rechtsrichtung
    const left = new THREE.Vector3(-0.5, 0, 0);
    const up = new THREE.Vector3(0, 0.1, 0); // Aufwärtsrichtung
    let offset = new THREE.Vector3();

    switch (pillarName) {
      case 'Pillar_5':
        offset = forward.clone().add(right).add(up);
        targetPosition.current = camera.position.clone().add(offset);
        lookAtPosition.current = new THREE.Vector3(0.99, 0.2, -1); // Feste Position
        break;
      case 'Pillar_4':
        offset = forward.clone().add(left).add(up);
        targetPosition.current = camera.position.clone().add(offset);
        lookAtPosition.current = new THREE.Vector3(-0.95, 0.2, -1); // Feste Position
        break;
        case 'Pillar_3':
          offset = forward.clone().add(up);
          targetPosition.current = camera.position.clone().add(offset);
          lookAtPosition.current = new THREE.Vector3(0, 0.2, -0.5); // Feste Position
          break;
      default:
        return;
    }

    offset.applyQuaternion(camera.quaternion); // Wende die aktuelle Rotation der Kamera auf die Richtung an
    targetPosition.current.add(offset); // Zielposition aktualisieren
  }, [camera, clickedPillars]);

  const handleXClick = useCallback(() => {
    setClickedItem(null);
    setClickedPillars({}); // Setze die geklickten Pfeiler zurück
    setIsVisible(false); 
    targetPosition.current = originalPosition.current.clone(); // Setze die Zielposition auf die ursprüngliche Kameraposition
    lookAtPosition.current = originalLookAt.current.clone(); // Setze die Blickrichtung auf die ursprüngliche Blickrichtung
  }, [setClickedItem]);

  useFrame(() => {
    if (targetPosition.current && lookAtPosition.current) {
      camera.position.lerp(targetPosition.current, 0.01);
      lookAtPosition.current.lerp(lookAtPosition.current, 0.001); // Smoothly interpolate the look-at position
      camera.lookAt(lookAtPosition.current);
    }
  });

  const pillars = useMemo(() => ['Pillar_5', 'Pillar_4', 'Pillar_3'], []);

  return (
    <>
    <Html className={`overlay ${isVisible ? 'visible' : ''}`}>
        <div>
          <button onClick={handleXClick}>X</button>
        </div>
      </Html>

    <group {...props} dispose={null} position={[-21.7, -3, 16.5]} rotation={[0, 0, 0]}>
      <group name="Scene">
        {pillars.map(pillarName => (
          <mesh
            key={pillarName}
            onPointerOver={() => handlePointerOver(pillarName)}
            onPointerOut={() => handlePointerOut(pillarName)}
            onClick={() => handlePillarClick(pillarName)}
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
              resolution={512} // Reduziere die Auflösung für bessere Leistung
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
              resolution={512} // Reduziere die Auflösung für bessere Leistung
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
            resolution={512} // Reduziere die Auflösung für bessere Leistung
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
   </>
  );
}

useGLTF.preload('/room1236.glb');
