import { Dispatch, SetStateAction } from 'react'

export enum Brush {
  start = `start`,
  move = `brush`,
  end = `end`,
}

export type CleanBrushFunction = () => void

export interface Brushable {
  clean: (key: SVGGElement) => void
  setCleanBrushes: Dispatch<SetStateAction<CleanBrushFunction[]>>
  setComponentBrushing: Dispatch<SetStateAction<SVGGElement | null>>
}
