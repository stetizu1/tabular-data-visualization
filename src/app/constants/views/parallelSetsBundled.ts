import { schemeCategory10 } from 'd3'

import { ParallelSetsBundledSettings } from '../../types/views/settings/ParallelSetsBundledSettings'
import { ColorArray } from '../../types/styling/ColorArray'
import { ColoringFrom } from '../data/ColoringFrom'
import { ParallelSetsBrushingType } from '../data/ParallelSetsBrushingType'
import { DEFAULT_FONT_COLOR_PARALLEL_SETS } from './common'

export const MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT = 2

export const PARALLEL_SETS_BUNDLED_DEFAULT: Pick<
  ParallelSetsBundledSettings,
  | `margins`
  | `opacity`
  | `colorCategory`
  | `tabWidth`
  | `tabSpacing`
  | `tabGap`
  | `coloringFrom`
  | `brushingType`
  | `fontColor`
> = {
  margins: [5, 50, 10, 50],
  opacity: [60, 70, 25],
  colorCategory: schemeCategory10 as ColorArray,
  tabWidth: 8,
  tabSpacing: 3,
  tabGap: 10,
  coloringFrom: ColoringFrom.left,
  brushingType: ParallelSetsBrushingType.top,
  fontColor: DEFAULT_FONT_COLOR_PARALLEL_SETS,
}
