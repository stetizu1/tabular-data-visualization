/**
 * Brush selection in 1D (on axis)
 */
import { Extent } from '../d3-types'

export type BrushSelection1d = [number, number] | null

/**
 * Brush selection in 2D (in rectangle)
 */
export type BrushSelection2d = Extent | null
