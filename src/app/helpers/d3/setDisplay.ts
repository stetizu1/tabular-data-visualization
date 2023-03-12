/**
 * Function to display elements
 */
import { selectAll } from 'd3'

import { SVG } from '@/constants/svg'

import { getClass } from '../stringGetters'

/**
 * Set if the elements are displayed (in d3.js manner)
 * @param isVisible - true if they should be visible, false if not
 * @param displayClass - class of elements to be shown/hidden
 */
export const setDisplay = (isVisible: boolean | undefined, displayClass: string): void => {
  if (isVisible) {
    selectAll(getClass(displayClass)).style(SVG.style.display, SVG.values.block)
    return
  }
  selectAll(getClass(displayClass)).style(SVG.style.display, SVG.values.none)
}
