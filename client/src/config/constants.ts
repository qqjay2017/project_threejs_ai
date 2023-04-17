import { ai, download, fileIcon, logoShirt, stylishShirt, swatch } from '../assets/index';


export interface ITab {
	name:string;
	icon:string;
}
export const EditorTabs = [
	{
		name: 'colorpicker',
		icon: swatch,
	},
	{
		name: 'filepicker',
		icon: fileIcon,
	},
	{
		name: 'aipicker',
		icon: ai,
	},
];

export const FilterTabs = [
	{
		name: 'logoShirt',
		icon: logoShirt,
	},
	{
		name: 'stylishShirt',
		icon: stylishShirt,
	},
	{
		name: 'download',
		icon: download,
	},
];
export type DecalTypeKeys = "logo"|"full";
export const DecalTypes :Record<DecalTypeKeys,{
	stateProperty:string;
	filterTab:string;
}>= {
	logo: {
		stateProperty: 'logoDecal',
		filterTab: 'logoShirt',
	},
	full: {
		stateProperty: 'fullDecal',
		filterTab: 'stylishShirt',
	},
};
