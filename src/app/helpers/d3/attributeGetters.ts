import { ScaleOrdinal } from 'd3'

import { SelectableDataType } from '../../types/data/data'
import { DataEach } from '../../types/d3-types'

export type GetCategoryColor = (data: SelectableDataType) => string

export const getCategoryColor =
  (categoryAttribute: keyof SelectableDataType | undefined, color: ScaleOrdinal<string, string>): GetCategoryColor =>
  (data) =>
    categoryAttribute ? color(String(data[categoryAttribute])) : color(`1`)

const TEXT_Y_SHIFTS = { odd: 9, even: 19 }
export const TOGGLE_TEXT_Y_SHIFT = Math.max(...Object.values(TEXT_Y_SHIFTS))

export const getTextTogglingYShift: DataEach<unknown, SVGTextElement, number> = (_, idx) =>
  idx % 2 === 0 ? -TEXT_Y_SHIFTS.odd : -TEXT_Y_SHIFTS.even // index 0 is first, so odd
