import React from "react";
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { Group } from "three";
import { useGlobalStore } from "../store";

interface ICameraRigProps extends React.PropsWithChildren {}

export const CameraRig = ({ children }: ICameraRigProps) => {
  const {intro} = useGlobalStore()
  const group = React.useRef<Group>(null);
  useFrame((state, delta)=>{
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    let targetPosition:[number,number,number] = [-0.4, 0, 2];
    if(intro){
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    }else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }
        // set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
        group.current?.rotation && easing.dampE(
          group.current?.rotation,
          [state.pointer.y / 10, -state.pointer.x / 5, 0],
          0.25,
          delta
        )

  })
  return <group ref={group}>{children}</group>;
};
