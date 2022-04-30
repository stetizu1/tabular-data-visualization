import { ViewType } from '../../constants/views/ViewTypes'

import { SideEffectVoid } from '../basic/functionTypes'
import { SelectableDataType } from '../data/data'

export type SetComponentBrushing = (newComponent: ViewType | null) => void

/**
 * Interface for views that can show brushed data
 */
export interface Highlightable {
  /**
   * True if some component is brushing
   */
  isBrushingActive: boolean
}

/**
 * Interface for views, that can use brushing inside
 */
export interface Brushable extends Highlightable {
  /**
   * Setter for passing the brushing cleaning function to the Data Context component
   */
  registerCleanBrushing: (clean: SideEffectVoid) => void

  /**
   * Set/unset a brushing component
   * @param newComponent SVG `g` element or null if brushing was canceled
   */
  setComponentBrushing: SetComponentBrushing

  /**
   * Function for setting selected data
   */
  setDataSelected: (setFunction: (data: SelectableDataType) => boolean) => void

  /**
   * Property used to redraw a component while setting new selected data (props change for React)
   * It is not used inside of the component
   */
  redrawTime: number

  /**
   * True if brushing is only done on end of move
   */
  isBrushingOnEndOfMove?: boolean
}
