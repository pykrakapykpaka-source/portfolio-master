"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";

type MotionNumber = MotionValue<number>;

interface FlyingDonutProps {
  gltfPath: string;
  rotateX: MotionNumber;
  rotateY: MotionNumber;
  rotateZ: MotionNumber;
  donutPosX: MotionNumber;
  donutPosY: MotionNumber;
  donutPosZ: MotionNumber;
  scale: MotionNumber;
}

interface HeroDonutProps {
  gltfPath: string;
  donut2PosX: MotionNumber;
  donut2PosY: MotionNumber;
  donut2PosZ: MotionNumber;
  scale: MotionNumber;
  rotationX: MotionNumber;
}

export interface HeroSceneProps {
  gltfPath: string;
  gltfPath2: string;
  scale: MotionNumber;
  donutPosX: MotionNumber;
  donutPosY: MotionNumber;
  donutPosZ: MotionNumber;
  rotateX: MotionNumber;
  rotateY: MotionNumber;
  rotateZ: MotionNumber;
  donut2PosX: MotionNumber;
  donut2PosY: MotionNumber;
  donut2PosZ: MotionNumber;
  donut2Scale: MotionNumber;
  donut2RotationX: MotionNumber;
}

const FlyingDonut: React.FC<FlyingDonutProps> = ({
  donutPosX,
  donutPosY,
  donutPosZ,
  rotateX,
  rotateY,
  rotateZ,
  gltfPath,
  scale,
}) => {
  const gltf = useLoader(GLTFLoader, gltfPath);

  return (
    <motion.primitive
      object={gltf.scene}
      scale={scale}
      rotation-x={rotateX}
      rotation-y={rotateY}
      rotation-z={rotateZ}
      duration={300}
      position={[donutPosX, donutPosY, donutPosZ]}
    />
  );
};

const HeroDonut: React.FC<HeroDonutProps> = ({
  gltfPath,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  scale,
  rotationX,
}) => {
  const gltf = useLoader(GLTFLoader, gltfPath);
  const mesh = useRef<any>();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0009;
    }
  });

  return (
    <motion.primitive
      ref={mesh}
      object={gltf.scene}
      scale={scale}
      rotation-x={rotationX}
      position={[donut2PosX, donut2PosY, donut2PosZ]}
    />
  );
};

export default function HeroScene({
  gltfPath,
  gltfPath2,
  scale,
  donutPosX,
  donutPosY,
  donutPosZ,
  rotateX,
  rotateY,
  rotateZ,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  donut2Scale,
  donut2RotationX,
}: HeroSceneProps) {
  return (
    <Canvas
      style={{
        zIndex: "10",
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        left: "0px",
        height: "100svh",
        width: "100vw",
      }}
    >
      <ambientLight intensity={1.25} />
      <pointLight position={[3, 3, -5]} intensity={2.2} />
      <directionalLight position={[6, 8, 2]} intensity={1.4} />
      <directionalLight position={[-6, 2, -2]} intensity={0.6} />

      <FlyingDonut
        scale={scale}
        donutPosX={donutPosX}
        donutPosY={donutPosY}
        donutPosZ={donutPosZ}
        rotateX={rotateX}
        rotateY={rotateY}
        rotateZ={rotateZ}
        gltfPath={gltfPath}
      />

      <HeroDonut
        donut2PosX={donut2PosX}
        donut2PosY={donut2PosY}
        donut2PosZ={donut2PosZ}
        gltfPath={gltfPath2}
        scale={donut2Scale}
        rotationX={donut2RotationX}
      />
    </Canvas>
  );
}
