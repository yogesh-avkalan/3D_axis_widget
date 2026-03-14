"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

interface AxisProps {
  angle: number;
}

function RotatingAxes({ angle }: AxisProps) {
  const rad = (angle * Math.PI) / 180;

  return (
    <group rotation={[0, 0, rad]}>
      {/* Rotating E1 */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[3, 0.05, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <Text position={[3.3, 0, 0]} fontSize={0.3} color="red">
        E1
      </Text>

      {/* Rotating E2 */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 0.05]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <Text position={[0, 3.2, 0]} fontSize={0.3} color="green">
        E2
      </Text>
    </group>
  );
}

function ReferenceAxes() {
  return (
    <group>
      {/* Reference E1 */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      <Text position={[3.496, 0, 0]} fontSize={0.25} color="gray">
        E1 ref
      </Text>

      {/* Reference E2 */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      <Text position={[0, 3.5, 0]} fontSize={0.25} color="gray">
        E2 ref
      </Text>
    </group>
  );
}

function FixedE3() {
  return (
    <group>
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
    <Canvas camera={{ position: [0.5, 0.2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Fixed reference axes */}
      <ReferenceAxes />

      {/* Rotating axes */}
      <RotatingAxes angle={angle} />

      {/* Fixed E3 */}
      <FixedE3 />

      <OrbitControls />
    </Canvas>
  );
}
