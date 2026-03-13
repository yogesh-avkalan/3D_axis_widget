"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

interface AxisProps {
  angle: number;
}

function AxisLines({ angle }: AxisProps) {
  const rad = (angle * Math.PI) / 180;

  return (
    <group rotation={[0, 0, rad]}>
      {/* E1 axis */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[3, 0.05, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <Text position={[3.2, 0, 0]} fontSize={0.3} color="red">
        E1
      </Text>

      {/* E2 axis */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 0.05]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <Text position={[0, 3.2, 0]} fontSize={0.3} color="green">
        E2
      </Text>

      {/* E3 axis */}
      <mesh position={[0, 0, 1.5]}>
        <boxGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <Text position={[0, 0, 3.2]} fontSize={0.3} color="blue">
        E3
      </Text>
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
