import { SideEffectVoid } from '../basic/functionTypes'
import { SelectableDataType } from '../data/data'

/**
 * Interface for views that can show brushed data
 */
export interface Highlightable {
  /**
   * True if some component is brushing
   */
  readonly isBrushingActive: boolean
}

/**
 * Interface for views, that can use brushing inside
 */
export interface Brushable extends Highlightable {
  /**
   * Setter for passing the brushing cleaning function to the Data Context component
   */
  readonly registerCleanBrushing: (clean: SideEffectVoid) => void
  /**
   * Set/unset a brushing component
   * @param newComponent SVG `g` element or null if brushing was canceled
   */
  readonly setComponentBrushing: (newComponent: SVGGElement | null) => void
  /**
   * Function for setting selected data
   */
  readonly setDataSelected: (setFunction: (data: SelectableDataType) => boolean) => void
  /**
   * Property used to redraw a component while setting new selected data (props change for React)
   * It is not used inside of the component
   */
  readonly redrawTime: number
}
