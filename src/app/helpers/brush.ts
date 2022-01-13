import { Dispatch, SetStateAction } from 'react'

export enum Brush {
  start = `start`,
  move = `brush`,
  end = `end`,
}

export type CleanBrushFunction = () => void

export interface Brushable {
  isBrushingActive: boolean
  setIsBrushingActive: Dispatch<SetStateAction<boolean>>
  clean: (key: SVGGElement) => void
  setCleanBrushes: Dispatch<SetStateAction<CleanBrushFunction[]>>
  setComponentBrushing: Dispatch<SetStateAction<SVGGElement | null>>
  setSelected: (selected: boolean[]) => void
}
