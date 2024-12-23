"use client";
import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Reflector,
  Text,
  TransformControls,
} from "@react-three/drei";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

extend({ OrbitControls });

function CustomObject() {
  const bufferRef = useRef();
  useEffect(() => {
    bufferRef.current?.computeVertexNormals();
  }, []);

  const verticesCount = 10 * 3;
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2;
    }
    return positions;
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={bufferRef}>
        <bufferAttribute
          itemSize={3}
          array={positions}
          count={verticesCount}
          attach="attributes-position"
        />
      </bufferGeometry>
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
}

function GRoupMesh() {
  const newRef = useRef();
  const groupRef = useRef();
  const { camera, gl } = useThree();
  useFrame((state, delta) => {
    // newRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
  });
  return (
    <>
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <OrbitControls makeDefault />
      {/* <CustomObject /> */}
      <directionalLight position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={1} />

      <mesh scale={1.3} rotation-y={Math.PI * 0.35} position-x={2} ref={newRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <TransformControls object={newRef} mode={"translate"} />
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        scale={100}
        fixed={true}
      >
        <mesh position-x={-2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
          <Html position={[1, 1, 0]} center distanceFactor={5}>
            <div className="whitespace-nowrap bg-black/50 text-white px-4 py-2 rounded-2xl">
              Hello there
            </div>
          </Html>
        </mesh>
      </PivotControls>

      <mesh rotation-x={-Math.PI * 0.5} position={[0, -1, 0]} scale={10}>
        <planeGeometry args={[1, 1]} />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        {/* <MeshReflectorMaterial /> */}
      </mesh>
      <Float speed={5} floatIntensity={2}>
        <Text
          color="salmon"
          fontSize={0.6}
          maxWidth={2}
          textAlign="center"
          position-y={2}
        >
          I LOVE DREI
        </Text>
      </Float>
    </>
  );
}

export default function Home() {
  return (
    <div className="fixed h-full w-full overflow-hidden bg-sky-500">
      <Canvas flat>
        <GRoupMesh />
      </Canvas>
    </div>
  );
}
