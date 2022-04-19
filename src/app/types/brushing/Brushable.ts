import { Dispatch, SetStateAction } from 'react'

import { SideEffectVoid } from '../basic/functionTypes'

export interface Highlightable {
  isBrushingActive: boolean
}

export interface Brushable extends Highlightable {
  setCleanBrushes: Dispatch<SetStateAction<SideEffectVoid[]>>
  setComponentBrushing: (newComponent: SVGGElement | null) => void
  setSelected: (selected: boolean[]) => void
}
