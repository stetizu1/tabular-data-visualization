import { selectAll } from 'd3'

import { SVG } from '../../constants/svg'

import { getClass } from '../stringGetters'

export const setDisplay = (isVisible: boolean | undefined, displayClass: string): void => {
  if (isVisible) {
    selectAll(getClass(displayClass)).style(SVG.style.display, SVG.values.block)
    return
  }
  selectAll(getClass(displayClass)).style(SVG.style.display, SVG.values.none)
}
