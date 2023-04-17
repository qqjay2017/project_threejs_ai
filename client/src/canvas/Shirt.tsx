import { Decal, useGLTF, useTexture } from "@react-three/drei";
import React from "react";
import { useGlobalStore } from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { ColorRepresentation } from "three";

declare module "@react-three/drei" {
  interface GLTF {
    nodes: any;
    materials: any;
  }
}
interface GLTF {
  nodes: any;
  materials: any;
}

export const Shirt = () => {
  const { isFullTexture, isLogoTexture, logoDecal, fullDecal ,color} =
    useGlobalStore();
  const gltf: any = useGLTF<any>("/model/shirt_baked.glb");
  const logoTexture = useTexture(logoDecal);
  const fullTexture = useTexture(fullDecal);

  const { nodes, materials } = gltf;
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, color as ColorRepresentation, 0.25, delta));
  const stateString = JSON.stringify({
    isFullTexture, isLogoTexture, logoDecal, fullDecal ,color
  });
  return (
   <>
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
   </>
  );
};
