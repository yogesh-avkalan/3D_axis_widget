"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";

interface AxisProps {
  angle: number;
}

/* ---------- SOLID LINE ---------- */

interface LineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function SolidLine({ start, end, color }: LineProps) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [start, end],
  );
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, linewidth: 2 }),
    [color],
  );

  return <primitive object={new THREE.Line(geometry, material)} />;
}

/* ---------- DASHED LINE ---------- */

function DashedLine({ start, end, color }: LineProps) {
  const ref = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  const material = useMemo(
    () => new THREE.LineDashedMaterial({ color, dashSize: 0.2, gapSize: 0.15 }),
    [color],
  );

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.computeLineDistances();
    }
  }, [geometry]);

  return <primitive object={new THREE.Line(geometry, material)} ref={ref} />;
}

/* ---------- ROTATING AXES ---------- */

function RotatingAxes({ angle }: AxisProps) {
  const rad = (angle * Math.PI) / 180;

  return (
    <group rotation={[0, 0, rad]}>
      <SolidLine start={[0, 0, 0]} end={[3, 0, 0]} color="red" />
      <Text position={[3.3, 0, 0]} fontSize={0.3} color="red">
        E1
      </Text>

      <SolidLine start={[0, 0, 0]} end={[0, 3, 0]} color="green" />
      <Text position={[0, 3.3, 0]} fontSize={0.3} color="green">
        E2
      </Text>
    </group>
  );
}

/* ---------- FIXED E3 ---------- */

function FixedE3() {
  return (
    <group>
      <SolidLine start={[0, 0, 0]} end={[0, 0, 3]} color="blue" />
      <Text position={[0, 0, 3.3]} fontSize={0.3} color="blue">
        E3
      </Text>
    </group>
  );
}

/* ---------- REFERENCE LINES ---------- */

function ReferenceLines() {
  return (
    <group>
      {/* E1 reference */}
      <DashedLine start={[0, 0, 0]} end={[3, 0, 0]} color="gray" />

      {/* E2 reference */}
      <DashedLine start={[0, 0, 0]} end={[0, 3, 0]} color="gray" />

      {/* Additional reference vector V1 */}
      <DashedLine start={[0, 0, 0]} end={[2.5, 1.5, 0]} color="orange" />
      <Text position={[2.6, 1.6, 0]} fontSize={0.25} color="orange">
        V1
      </Text>
    </group>
  );
}

/* ---------- MAIN SCENE ---------- */

export function Axis3D({ angle }: AxisProps) {
  return (
    <Canvas camera={{ position: [0.5, 0.2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Fixed reference lines (dashed) */}
      <ReferenceLines />

      {/* Rotating axes (solid) */}
      <RotatingAxes angle={angle} />

      {/* Fixed E3 axis (solid) */}
      <FixedE3 />

      <OrbitControls />
    </Canvas>
  );
}
