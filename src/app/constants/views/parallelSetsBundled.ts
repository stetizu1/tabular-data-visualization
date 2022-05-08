import { schemeCategory10 } from 'd3'

import { ParallelSetsBundledSettings } from '../../types/views/settings/ParallelSetsBundledSettings'
import { ColorArray } from '../../types/styling/ColorArray'

export const MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT = 2

export const PARALLEL_SETS_BUNDLED_DEFAULT: Pick<ParallelSetsBundledSettings, `margins` | `opacity` | `colorCategory`> =
  {
    margins: [5, 50, 10, 50],
    opacity: [50, 60, 20],
    colorCategory: schemeCategory10 as ColorArray,
  }
