"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { MotionValue, motion as motionDiv } from "framer-motion";
import { motion } from "framer-motion-3d";

type motionType = MotionValue<number>;

interface ModelProps {
  gltfPath: string;
  rotateX: motionType;
  rotateY: motionType;
  rotateZ: motionType;
  donutPosX: motionType;
  donutPosY: motionType;
  donutPosZ: motionType;
  scale: motionType;
}

const FlyingDonut: React.FC<ModelProps> = ({
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
      position={[donutPosX, donutPosY, donutPosZ]}
    />
  );
};

const HeroDonut = ({
  gltfPath,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  scale,
  rotationX,
}: {
  gltfPath: string;
  donut2PosX: motionType;
  donut2PosY: motionType;
  donut2PosZ: motionType;
  scale: motionType;
  rotationX: motionType;
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

export default function HeroCanvas({
  scale,
  rotateX,
  rotateY,
  rotateZ,
  donutPosX,
  donutPosY,
  donutPosZ,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  donut2RotationX,
  donut2Scale,
}: {
  scale: motionType;
  rotateX: motionType;
  rotateY: motionType;
  rotateZ: motionType;
  donutPosX: motionType;
  donutPosY: motionType;
  donutPosZ: motionType;
  donut2PosX: motionType;
  donut2PosY: motionType;
  donut2PosZ: motionType;
  donut2RotationX: motionType;
  donut2Scale: motionType;
}) {
  const gltfPath = "/assets/untitled5.glb";
  const gltfPath2 = "/assets/untitled.glb";

  return (
    <motionDiv.div className="duration-500">
      <Canvas
        style={{
          zIndex: 10,
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
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
    </motionDiv.div>
  );
}
