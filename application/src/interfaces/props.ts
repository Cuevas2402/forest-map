import { ReactNode } from "react";
import Forest from "./forest";

export interface GlobalMapProps {
	forests : Forest[],
	curr : Forest | null;
	setCurr : (forest : Forest) => void,
	dist : TreesDist[][],
	currDist : TreesDist[],
	setCurrDist : (td : TreesDist[]) => void,
}

export interface TreesDist {
	_id: number,
	total : number
}

export interface TreesChartProps {
	dist : TreesDist[],
}

export  interface ForestProviderProps {
	children : ReactNode
}

export interface TypesDist{
	_id: number,
	total: number,
}


