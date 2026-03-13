"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface AxisProps {
  angle: number;
}

function AxisLines({ angle }: AxisProps) {
  const rad = (angle * Math.PI) / 180;

  return (
    <group rotation={[0, rad, 0]}>
      {/* X axis */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[3, 0.05, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Y axis */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 0.05]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Z axis */}
      <mesh position={[0, 0, 1.5]}>
        <boxGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

export function Axis3D({ angle }: AxisProps) {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <AxisLines angle={angle} />

      <OrbitControls />
    </Canvas>
  );
}