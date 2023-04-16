import React from "react";
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

interface ICameraRigProps extends React.PropsWithChildren {}

export const CameraRig = ({ children }: ICameraRigProps) => {

  const group = React.useRef(null);
  useFrame((state, delta)=>{
 
  })
  return <group ref={group}>{children}</group>;
};
