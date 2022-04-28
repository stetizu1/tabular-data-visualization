import { selectAll } from 'd3'

import { SVG } from '../../constants/svg'

import { getClass } from './stringGetters'

export const displayDetails = (isDetailsVisible: boolean | undefined, tooltipClass: string): void => {
  if (isDetailsVisible) {
    selectAll(getClass(tooltipClass)).style(SVG.style.display, SVG.values.block)
    return
  }
  selectAll(getClass(tooltipClass)).style(SVG.style.display, SVG.values.none)
}
