import type{ WritableDraft } from 'immer/dist/types/types-external';
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'


const defaultState = {
    intro: true,
	color: 'rgb(55, 66, 75)',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './images/default.png',
	fullDecal: './images/default.png',
}

type  IGlobalBaseState = typeof defaultState;

type IGlobalBaseStateKeys = keyof typeof defaultState;

interface IGlobalState extends IGlobalBaseState{
    updateBykey:(key:IGlobalBaseStateKeys ,newState:any)=>any;
}

export const useGlobalStore = create(
  immer<IGlobalState>((set) => ({
    ...defaultState,
    updateBykey: (key,newState) =>
      set((state) => {
            (state[key] as any) =newState;
        
      }),
  }))
)