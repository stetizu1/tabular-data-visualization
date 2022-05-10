import { DataEach } from '../../types/d3-types'

/**
 * y shift for parallel coordinates/sets axes labels
 */
const TEXT_Y_SHIFTS = { odd: 9, even: 19 }

export const TOGGLE_Y_SHIFT = Math.max(...Object.values(TEXT_Y_SHIFTS))

export const getTogglingYShift: DataEach<unknown, SVGTextElement, number> = (_, idx) =>
  idx % 2 === 0 ? -TEXT_Y_SHIFTS.odd : -TEXT_Y_SHIFTS.even // index 0 is first, so odd
