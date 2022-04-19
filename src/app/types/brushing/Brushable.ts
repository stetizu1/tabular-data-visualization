import { Dispatch, SetStateAction } from 'react'

import { SideEffectVoid } from '../basic/functionTypes'

export interface Highlightable {
  isBrushingActive: boolean
}

export interface Brushable extends Highlightable {
  cleanBrushes: (key: SVGGElement) => void
  setCleanBrushes: Dispatch<SetStateAction<SideEffectVoid[]>>
  setComponentBrushing: Dispatch<SetStateAction<SVGGElement | null>>
  setSelected: (selected: boolean[]) => void
}
