import { SideEffectVoid } from '../basic/functionTypes'

export interface Highlightable {
  readonly isBrushingActive: boolean
}

/**
 * Interface for views, that can be brushed
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
   * Function for redrawing components, need to be called after every dataset selection change
   */
  readonly redraw: () => void
  /**
   * Property used to redraw a component using `redraw` function (props change for React)
   */
  readonly redrawTime: number
}
