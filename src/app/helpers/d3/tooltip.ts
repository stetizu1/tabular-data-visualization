/**
 * Tooltip and it's actions
 */
import { OnMouseEvent } from '@/types/d3-types'
import { select } from 'd3'
import { MouseEvent } from 'react'

import { HTML } from '@/constants/others'
import { SVG } from '@/constants/svg'
import { TOOLTIP, TOOLTIP_CLASS } from '@/constants/views-general/tooltip'

import { getClass, px } from '../stringGetters'

export const onMouseOverTooltip =
  <T>(stringFunction: (data: T) => string[]): OnMouseEvent<T> =>
  ({ clientX, clientY }: MouseEvent, data: T): void => {
    const tooltip = select(getClass(TOOLTIP_CLASS))
    tooltip.transition().duration(TOOLTIP.easeIn).style(SVG.style.opacity, TOOLTIP.visible)
    tooltip
      .html(stringFunction(data).join(HTML.newLine))
      .style(SVG.style.left, px(clientX))
      .style(SVG.style.top, px(clientY))
  }

export const onMouseOutTooltip = (): null => {
  select(getClass(TOOLTIP_CLASS)).transition().duration(TOOLTIP.easeOut).style(SVG.style.opacity, TOOLTIP.invisible)
  return null
}
