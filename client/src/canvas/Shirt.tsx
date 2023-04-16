import { useGLTF } from '@react-three/drei';
import React from 'react'

 
declare module "@react-three/drei" {
    interface GLTF  {
        nodes:any;
        materials:any
    }
}
interface GLTF  {
    nodes:any;
    materials:any
}

export const Shirt = () => {
    const gltf = useGLTF<any>('/model/shirt_baked.glb');
    console.log('%cShirt.tsx line:6 gltf', 'color: #007acc;', gltf);
    const { nodes, materials } = gltf;
  return (
    <group>
        <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        >

        </mesh>
    </group>
  )
}
