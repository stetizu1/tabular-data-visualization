/**
 * Type to work with brushable views
 */

import { ViewType } from '../../constants/views-general/ViewType'

export type SetComponentBrushing = (newComponent: ViewType | null) => void

/**
 * Interface for views, that can use brushing
 */
export interface Brushable {
  /**
   * True if some component is brushing
   */
  isBrushingActive: boolean

  /**
   * Setter for passing the brushing cleaning function to the Data Context component
   */
  registerCleanBrushing: (clean: () => void) => void

  /**
   * Set/unset a brushing component
   * @param newComponent SVG `g` element or null if brushing was canceled
   */
  setComponentBrushing: SetComponentBrushing

  /**
   * Function for refreshing views after changing selected
   */
  refreshViews: () => void

  /**
   * Property used to redraw a component while setting new selected data (props change for React)
   * It is not used inside of the component
   */
  redrawTime: number

  /**
   * True if brushing is only done on end of move
   */
  isBrushingOnEndOfMove?: boolean

  /**
   * Brush color for graphs
   */
  brushColor: string
}
