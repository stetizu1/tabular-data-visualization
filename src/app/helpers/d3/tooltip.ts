/**
 * tooltip and it's actions
 */
import { select } from 'd3'

import { OnMouseEvent } from '../../types/d3-types'
import { SelectableDataType } from '../../types/data/data'

import { TOOLTIP, TOOLTIP_CLASS } from '../../constants/views/tooltip'
import { SVG } from '../../constants/svg'
import { HTML } from '../../constants/html'

import { getAttributeValuesWithLabel, getClass, px } from './stringGetters'

export const onMouseOverTooltip: OnMouseEvent<SelectableDataType> = ({ clientX, clientY }, data) => {
  const tooltip = select(getClass(TOOLTIP_CLASS))
  tooltip.transition().duration(TOOLTIP.easeIn).style(SVG.style.opacity, TOOLTIP.visible)
  tooltip
    .html(getAttributeValuesWithLabel(data).join(HTML.newLine))
    .style(SVG.style.left, px(clientX))
    .style(SVG.style.top, px(clientY))
}

export const onMouseOutTooltip: OnMouseEvent<SelectableDataType> = () => {
  select(getClass(TOOLTIP_CLASS)).transition().duration(TOOLTIP.easeOut).style(SVG.style.opacity, TOOLTIP.invisible)
}
