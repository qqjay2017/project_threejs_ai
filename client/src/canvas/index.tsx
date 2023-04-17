import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { Shirt } from "./Shirt";
import { Backdrop } from "./Backdrop";
import { useGlobalStore } from "../store";
import { iOSFix } from "../config/helpers";
export const CanvasModel = () => {
  const intro = useGlobalStore((s) => s.intro);
  if (intro) {
    setTimeout(() => {
      iOSFix();
    }, 1000);
  }
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="h-full transition-all ease-in capture  forIOS"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <CameraRig>
          <Backdrop />
          <Center right={!!intro}>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
    </>
  );
};
