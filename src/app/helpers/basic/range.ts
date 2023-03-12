import { Extent } from '@/types/d3-types'

/**
 * Return true if number is in range
 * @param number
 * @param range
 */
export const isInRange = (number: number, range: [number, number]): boolean => number > range[0] && number < range[1]

/**
 * Returns true if point [cx, cy] is in x and y ranges
 * @param ranges = [[xFrom, xTo], [yFrom, yTo]]
 * @param cx - X center of point
 * @param cy - Y center of point
 */
export const isInRanges = (ranges: Extent, cx: number, cy: number): boolean => {
  const [x0, x1, y0, y1] = [ranges[0][0], ranges[1][0], ranges[0][1], ranges[1][1]]
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
}
