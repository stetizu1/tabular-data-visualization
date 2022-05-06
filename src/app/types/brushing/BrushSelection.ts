/**
 * Brush selection in 1D (on axis)
 */
import { BrushExtent } from '../d3-types'

export type BrushSelection1d = [number, number] | null

/**
 * Brush selection in 2D (in rectangle)
 */
export type BrushSelection2d = BrushExtent | null
