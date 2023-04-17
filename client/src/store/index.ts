import type{ WritableDraft } from 'immer/dist/types/types-external';
import { ColorModelString, HexColorString } from 'three';
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'

const defaultState = {
    intro: false,
	color: 'rgb(55, 66, 75)',
	isLogoTexture: false,
	isFullTexture: true,
	logoDecal: './images/default.png',
	fullDecal: './images/default.png',
}

type  IGlobalBaseState = typeof defaultState;

type IGlobalBaseStateKeys = keyof typeof defaultState;

interface IGlobalState extends IGlobalBaseState{
    updateBykey:(key:IGlobalBaseStateKeys ,newState:any)=>any;
}

export const useGlobalStore = create(
  persist(immer<IGlobalState>((set) => ({
    ...defaultState,
    updateBykey: (key,newState) =>
      set((state) => {
            (state[key] as any) =newState;
        
      }),
  })),{
    name: 'food-storage', // unique name
   
  }) 
)